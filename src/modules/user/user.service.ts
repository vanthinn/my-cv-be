import { JobApplyService } from './../jobApply/jobApply.service';
import { BadRequestException, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/database/services';
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from './dto';
import { Pagination } from 'src/providers';
import { isNotEmpty } from 'class-validator';
import { RoleService } from '../role';
import { Prisma } from '@prisma/client';
import { TenantService } from '../tenant';
import { RequestUser } from 'src/common';
import { searchByMode } from 'src/common/utils/prisma';
import { UserRole } from 'src/common/types/enum';

@Injectable()
export class UserService {
  constructor(
    private dbContext: PrismaService,
    private roleService: RoleService,
    @Inject(forwardRef(() => JobApplyService))
    private JobApplyService: JobApplyService) { }
  private readonly logger: Logger = new Logger(UserService.name);

  createUser = async (data: CreateUserDto) => {
    const { email, roleId, tenantId } = data;
    const rolesData = await this.roleService.roleExists(roleId);

    if (!rolesData) {
      throw new BadRequestException('The roles provided are invalid');
    }

    const existedEmail = await this.findUserByEmail(email, tenantId);

    if (isNotEmpty(existedEmail)) {
      throw new BadRequestException('The username has already been used');
    }


    const user = await this.dbContext.user.create({
      data,
    });
    return user;
  };

  findUserByEmail = async (email: string, tenantId: string) => {
    const userWhereUniqueInput: Prisma.UserWhereUniqueInput = {
      email_tenantId: {
        email: email,
        tenantId: tenantId
      }
    };
    const user = await this.dbContext.user.findUnique({
      where: userWhereUniqueInput, select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
        avatarUrl: true,
        roleId: true,
        tenantId: true
      }
    })
    return user;
  }

  findUserById = async (id: string) => {
    const user = await this.dbContext.user.findUnique({
      where: { id: id }, select: {
        id: true,
        email: true,
        firstName: true,
        avatarUrl: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        company: true
      }
    })
    return user;
  }

  getAllJobApplyOfUser = async (user: RequestUser) => {
    const listJobApply = await this.dbContext.jobApply.findMany({
      where: {
        email: user.email,
        deletedAt: null
      }, select: {
        id: true,
        candidateName: true,
        createdAt: true,
        email: true,

        job: {
          select: {
            id: true,
            jobTitle: true,
            deadline: true,
            jobType: true,
            experience: true,
            salary: true,
            education: true,
            company: {
              select: {
                id: true,
                logoUrl: true,
                address: true,
                displayName: true
              }
            },
          }
        },
        CV: {
          select: {
            id: true,
            image: true,
          }
        }
      }
    })
    return listJobApply
  }

  getAllUsers = async ({ search, skip, take }: GetUsersQueryDto) => {
    const whereConditions: Prisma.Enumerable<Prisma.UserWhereInput> = [{
      role: {
        name: {
          not: UserRole.ADMIN
        }
      }
    }];
    if (search) {
      whereConditions.push({
        OR: [
          { firstName: searchByMode(search) },
          { lastName: searchByMode(search) }
        ]
      });
    }

    const [total, users] = await Promise.all([
      this.dbContext.user.count({
        where: {
          AND: whereConditions,

        },
      }),
      this.dbContext.user.findMany({
        where: {
          AND: whereConditions,
        },
        skip,
        take,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          address: true,
          dateOfBirth: true,
          email: true,
          gender: true,
          phoneNumber: true,
          role: {
            select: {
              id: true,
              name: true,
            }
          }
        }
      }),
    ]);

    return Pagination.of({ take, skip }, total, users);
  };

  updateUser = async (id: string, data: UpdateUserDto) => {
    let newData = data;
    if (data.dateOfBirth) {
      const dateOfBirth = new Date(data.dateOfBirth)
      newData = { ...newData, dateOfBirth: dateOfBirth }
    }
    const user = await this.dbContext.user.update({
      where: {
        id,
      },
      data: {
        ...newData
      }, select: {
        id: true,
        email: true,
        firstName: true,
        avatarUrl: true,
        lastName: true,
        phoneNumber: true,
        dateOfBirth: true,
        address: true,
        gender: true,
        role: {
          select: {
            id: true,
            name: true
          }
        },
        company: true
      },
    });
    this.logger.log('Updated the user records', { user });
    return user;
  };

  updateUserCompany = async (userId: string, id: string) => {
    const user = await this.dbContext.user.update({
      where: { id: userId },
      data: { companyId: id },
    })
    this.logger.log('Updated the company user', { user });
  }

  getAllCVOfUser = async (id: string) => {
    const cvs = await this.dbContext.cV.findMany({
      where: { userId: id }, select: {
        id: true,
        color: true,
        fontSize: true,
        fontStyle: true,
        title: true,
        template: true,
        skills: true,
        summary: true,
        state: true,
        userId: true,
        certificates: true,
        languages: true,
        image: true,
        education: true,
        profile: true,
        experiences: true,
      }
    })

    return cvs;
  }

  getCVMainOfUser = async (id: string) => {
    const cv = await this.dbContext.cV.findFirst({
      where: { userId: id, state: true }, select: {
        id: true,
        color: true,
        fontSize: true,
        fontStyle: true,
        title: true,
        template: true,
        skills: true,
        summary: true,
        state: true,
        userId: true,
        certificates: true,
        languages: true,
        education: true,
        profile: true,
        experiences: true,
      }
    })

    return cv;
  }
}
