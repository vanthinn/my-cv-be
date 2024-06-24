import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { RequestUser } from 'src/common';
import { PrismaService } from 'src/database/services';
import { CreateJobOfferDto } from './dto/createJobOffer.dto';
import { UserService } from '../user';
import { UpdateJobOfferDto } from './dto/updateJobOffer.dto';
import { GetAllJobOfferDto } from './dto/getAllJobOffers.dto';
import { Prisma } from '@prisma/client';
import { getOrderBy, searchByMode } from 'src/common/utils/prisma';
import { Pagination } from 'src/providers';
import { CompanyService } from '../company';
import { JobApplyService } from '../jobApply';

@Injectable()
export class JobOfferService {
  constructor(
    private readonly dbContext: PrismaService,
    @Inject(forwardRef(() => UserService))

    private userService: UserService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
  ) { }
  private readonly logger: Logger = new Logger(JobOfferService.name);

  async getAllJobOffers(user: RequestUser, query: GetAllJobOfferDto) {
    await this.updateJobOfferStatus();
    const { search, city, skip, take, order, companyId, userId, experience, status } =
      query;
    const whereConditions: Prisma.Enumerable<Prisma.JobWhereInput> = [{ deletedAt: null }];
    if (search) {
      whereConditions.push({
        jobTitle: searchByMode(search),
      });
    }

    if (city && city !== 'All Cities') {
      whereConditions.push({
        company: {
          address: searchByMode(city),
        },
      });
    }

    if (experience && experience !== 'All experience') {
      whereConditions.push({
        experience: searchByMode(experience),
      });
    }

    if (companyId) {
      whereConditions.push({
        companyId: companyId,
      });
    }

    if (status) {
      whereConditions.push({
        status: status,
      })
    }

    let orderBy: Prisma.JobOrderByWithRelationInput = getOrderBy({
      defaultValue: 'createdAt',
      order,
    });

    const [total, jobs] = await Promise.all([
      this.dbContext.job.count({
        where: {
          AND: whereConditions,
        },
      }),
      this.dbContext.job.findMany({
        where: {
          AND: whereConditions,
        },
        skip,
        take,
        orderBy,
        select: {
          id: true,
          jobTitle: true,
          experience: true,
          salary: true,
          skills: true,
          jobType: true,
          education: true,
          deadline: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          company: {
            select: {
              id: true,
              displayName: true,
              address: true,
              logoUrl: true,
            },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      }),
    ]);

    let newJobs = jobs;
    if (userId) {
      const jobBookmarkUser = await this.dbContext.jobBookmark.findMany({
        where: { userId: userId },
      });
      newJobs = jobs.map((job) => {
        const statusBookmark = jobBookmarkUser.find(
          (bookmark) => bookmark.jobId === job.id,
        )
          ? 'BOOKMARK'
          : 'NONE_BOOKMARK';
        return {
          ...job,
          statusBookmark: statusBookmark,
        };
      });
    }


    return Pagination.of({ take, skip }, total, newJobs);
  }

  private async updateJobOfferStatus() {
    const now = new Date();
    const nextDay = new Date(now);

    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const deadline = new Date(nextDay);

    await this.dbContext.job.updateMany({
      where: {
        deadline: {
          lt: deadline
        }
      },
      data: {
        status: 'INACTIVE'
      }
    })
  }

  async createJobOffer(user: RequestUser, data: CreateJobOfferDto) {
    const userTmp = await this.userService.findUserById(user.id);
    const jobOffer = await this.dbContext.job.create({
      data: {
        ...data,
        deadline: new Date(data.deadline).toISOString(),
        companyId: userTmp.company.id,
        userId: user.id,
        status: 'ACTIVE',
      },
    });

    this.logger.log('Create the job', { jobOffer });
  }

  async updateJobOffer(user: RequestUser, id: string, data: UpdateJobOfferDto) {
    const updateJob = await this.dbContext.job.update({
      where: { id },
      data: {
        ...data,
        deadline: new Date(data.deadline).toISOString()
      },
    });
  }

  async deleteJobOffer(user: RequestUser, id: string) {
    const now = new Date().toISOString();
    const deleteJob = await this.dbContext.job.update({
      where: { id },
      data: { deletedAt: now },
    });
  }

  async findJobOfferById(
    user: RequestUser,
    query: { jobId: string; userId?: string },
  ) {
    const { jobId, userId } = query;
    const jobOffer = await this.dbContext.job.findUnique({
      where: { id: jobId },
      select: {
        id: true,
        jobTitle: true,
        experience: true,
        salary: true,
        skills: true,
        jobType: true,
        education: true,
        deadline: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        company: true,
        user: true,
        // jobApply: true,
      },
    });

    let newJobOffer: any = jobOffer;
    if (userId) {
      const checkJobOnBookmarkUser = await this.dbContext.jobBookmark.findFirst(
        { where: { jobId: jobId, userId: userId } },
      );
      newJobOffer = {
        statusBookmark: checkJobOnBookmarkUser ? 'BOOKMARK' : 'NONE_BOOKMARK',
        ...jobOffer,
      };
    }

    const jobsCompany = await this.dbContext.job.findMany({
      where: {
        companyId: jobOffer.company.id,
        NOT: {
          id: jobOffer.id,
        },
      },
    });
    const newData = { ...newJobOffer, jobsCompany: jobsCompany };
    return newData;
  }
}
