import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/services';
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from './dto';
import { Pagination } from 'src/providers';
import { isNotEmpty } from 'class-validator';
import { RoleService } from '../role';

@Injectable()
export class UserService {
  constructor(private dbContext: PrismaService, private roleService: RoleService) { }
  private readonly logger: Logger = new Logger(UserService.name);

  createUser = async (data: CreateUserDto) => {
    const { email, roleId } = data;

    const rolesData = await this.roleService.roleExists(roleId);

    if (!rolesData) {
      throw new BadRequestException('The roles provided are invalid');
    }

    const existedEmail = await this.findUserByEmail(email);

    if (isNotEmpty(existedEmail)) {
      throw new BadRequestException('The username has already been used');
    }


    const user = await this.dbContext.user.create({
      data,
    });
    return user;
  };

  findUserByEmail = async (email: string) => {
    const user = await this.dbContext.user.findUnique({
      where: { email: email }, select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
        avatarUrl: true,
        roleId: true
      }
    })
    return user;
  }

  findUserById = async (id: string) => {
    const user = await this.dbContext.user.findUnique({
      where: { id: id }, select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
        role: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return user;
  }



  getAllUsers = async ({ search, skip, take }: GetUsersQueryDto) => {
    const [total, users] = await Promise.all([
      this.dbContext.user.count({}),
      this.dbContext.user.findMany({
        skip,
        take,
      }),
    ]);

    return Pagination.of({ take, skip }, total, users);
  };

  updateUser = async (id: string, data: UpdateUserDto) => {
    const user = await this.dbContext.user.update({
      where: {
        id,
      },
      data,
    });
  };
}
