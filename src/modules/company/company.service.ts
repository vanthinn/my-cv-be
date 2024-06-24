import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { RequestUser } from 'src/common';
import { PrismaService } from 'src/database/services';
import { CreateCompanyDto } from './dto/createCompanyDto.dto';
import { UserService } from '../user';
import { UpdateCompanyDto } from './dto/updateCompanyDto.dto';
import { getALLCompanyDto } from './dto/getAllCompanyDto.dto';
import { Prisma } from '@prisma/client';
import { getOrderBy, searchByMode } from 'src/common/utils/prisma';
import { Pagination } from 'src/providers';
import { JobOfferService } from '../jobOffer';

@Injectable()
export class CompanyService {
  constructor(
    private readonly dbContext: PrismaService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => JobOfferService))
    private jobOfferService: JobOfferService,
  ) { }
  private readonly logger: Logger = new Logger(CompanyService.name);

  async getAllCompany(user: RequestUser, query: getALLCompanyDto) {
    const { search, city, skip, take, order } = query;
    const whereConditions: Prisma.Enumerable<Prisma.CompanyWhereInput> = [];
    if (search) {
      whereConditions.push({
        displayName: searchByMode(search),
      });
    }

    if (city !== 'All Cities') {
      whereConditions.push({
        address: searchByMode(city),
      });
    }

    let orderBy: Prisma.JobOrderByWithRelationInput = getOrderBy({
      defaultValue: 'createdAt',
      order,
    });

    const [total, companies] = await Promise.all([
      this.dbContext.company.count({
        where: {
          AND: whereConditions,
        },
      }),
      this.dbContext.company.findMany({
        where: {
          AND: whereConditions,
        },
        skip,
        take,
        orderBy,
        include: {
          _count: {
            select: {
              jobs: {
                where: {
                  status: 'ACTIVE',
                },
              },
            },
          },
        },
      }),
    ]);

    return Pagination.of({ take, skip }, total, companies);
  }

  async findCompanyById(id: string) {
    const company = await this.dbContext.company.findUnique({
      where: { id },
      select: {
        id: true,
        address: true,
        createdAt: true,
        description: true,
        displayName: true,
        email: true,
        phoneNumber: true,
        scale: true,
        website: true,
        fieldOfActivity: true,
        logoUrl: true,
        updatedAt: true,
        _count: true,
        jobs: true,
        users: true
      },
    });
    return company;
  }

  async getAllJobByCompany(id: string) {
    const jobs = await this.dbContext.job.findMany({ where: { id } });
    return jobs;
  }

  async createCompany(user: RequestUser, data: CreateCompanyDto) {
    const company = await this.dbContext.company.create({
      data: data,
    });
    await this.userService.updateUserCompany(user.id, company.id);
    return company;
  }

  async updateCompany(user: RequestUser, id: string, data: UpdateCompanyDto) {
    const company = await this.dbContext.company.update({
      where: { id },
      data,
    });
    this.logger.log('Updated the company ', { company });
    return company;
  }

  async deleteCompany(user: RequestUser, id: string) {
    const now = new Date().toISOString();
    const deleteCompanyDto = await this.dbContext.company.update({
      where: { id },
      data: { deletedAt: now },
    });
  }
}
