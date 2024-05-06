import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services';
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from './dto';
import { Pagination } from 'src/providers';

@Injectable()
export class UserService {
  constructor(private dbContext: PrismaService) { }

  createUser = async (data: CreateUserDto) => {
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
        role: {
          select: {
            name: true
          }
        }
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
