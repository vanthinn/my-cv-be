import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { LoginCredentialDto } from './dto';
import { AccessTokenGuard } from 'src/guard/accessToken.guard';
import { RefreshTokenGuard } from 'src/guard/refreshToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { RequestUser } from 'src/common';
import { ChangePasswordDto } from './dto/change-password.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  login(@Body() data: LoginCredentialDto) {
    const { email, password, tenantId } = data;
    return this.authService.signIn(email, password, tenantId);
  }

  @Post('forgot-password')
  forgotPassword(@Body() data: { email: string, tenantId: string }) {
    const { email, tenantId } = data;
    return this.authService.sendForgotPasswordEmail(email, tenantId);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    console.log(req)
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('change-password')
  async changePassword(
    @ReqUser() user: RequestUser,
    @Body() body: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(user, body);
  }
}
