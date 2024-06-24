import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto';
import { RequestUser, compareHash, hashPassword } from 'src/common';
import { getUsersPayload } from './dto/getUserPayload.dto';
import { PrismaService } from 'src/database/services';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private dbContext: PrismaService,
    private configService: ConfigService,
    private mailService: MailService,
  ) { }

  signIn = async (email: string, password: string, tenantId: string) => {
    const user = await this.userService.findUserByEmail(email, tenantId);

    if (!user) throw new BadRequestException('User does not exist');

    const passwordMatches = await compareHash(password, user.password);

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  };

  signUp = async (createUserDto: CreateUserDto) => {
    const userExists = await this.userService.findUserByEmail(
      createUserDto.email, createUserDto.tenantId
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await hashPassword(createUserDto.password);
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  };

  // async logout(userId: string) {
  //   return this.userService.updateUser(userId, { refreshToken: null });
  // }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hashPassword(refreshToken);
    await this.userService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getCredentials(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await compareHash(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userData: getUsersPayload) {
    const user = {
      email: userData.email,
      fullName: userData.firstName + ' ' + userData.lastName,
      role: userData.roleId,
      avatarUrl: userData.avatarUrl,
      tenantId: userData.tenantId
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userData.id,
          session: await hashPassword(Date.now().toString()),
          ...user,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '120m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userData.id,
          ...user,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async sendForgotPasswordEmail(email: string, tenantId: string) {
    const user = await this.userService.findUserByEmail(email, tenantId);
    if (!user) {
      throw new BadRequestException("The email doesn't exist in the system");
    }

    const existedToken = await this.dbContext.verificationToken.findFirst({
      where: {
        userId: user.id,
      },
    });

    const newToken = {
      token: await hashPassword(new Date().toISOString()),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      userId: user.id,
    };

    if (!existedToken) {
      await this.dbContext.verificationToken.create({
        data: newToken,
      });
    } else {
      await this.dbContext.verificationToken.update({
        where: {
          id: existedToken.id,
        },
        data: newToken,
      });
    }

    await this.mailService.sendResetPasswordToken(user.email, newToken.token);
  }

  async verifyToken(token: string) {
    const claims = await this.jwtService.verifyAsync<RequestUser>(token, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });

    const user = await this.userService.findUserById(claims.id);
    if (user) return claims;
  }

  async resetPassword(body: ResetPasswordDto) {
    const { email, token, password, tenantId } = body;
    const user = await this.userService.findUserByEmail(email, tenantId);
    if (!user) {
      throw new BadRequestException("The email doesn't exist in the system");
    }

    const resetToken = await this.dbContext.verificationToken.findFirst({
      where: {
        AND: [
          { token },
          {
            user: {
              email: email,
            },
          },
        ],
      },
    });

    if (!resetToken || Date.now() > resetToken.expiresAt.getTime()) {
      throw new BadRequestException('The token is invalid');
    }
    await this.dbContext.$transaction(async (trx) => {
      await trx.user.update({
        where: {
          email_tenantId: { email, tenantId },
        },
        data: {
          password: await hashPassword(password),
        },
      });
      await trx.verificationToken.delete({
        where: { id: resetToken.id },
      });
    });
  }

  async changePassword(reqUser: RequestUser, body: ChangePasswordDto) {
    console.log(reqUser)
    const { oldPassword, newPassword } = body;
    if (oldPassword === newPassword) {
      throw new BadRequestException('You are input the same password');
    }

    const user = await this.dbContext.user.findUnique({
      where: {
        id: reqUser.id,
        tenantId: reqUser.tenantId
      },
    });

    const isOldPassword = await compareHash(oldPassword, user.password);
    if (!isOldPassword) {
      throw new BadRequestException('You have inputted a wrong password');
    }

    const hashedPassword = await hashPassword(newPassword);

    await this.dbContext.user.update({
      where: {
        id: reqUser.id,
        tenantId: reqUser.tenantId
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
