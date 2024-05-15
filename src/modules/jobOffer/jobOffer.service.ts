import { Injectable, Logger } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";
import { CreateJobOfferDto } from "./dto/createJobOffer.dto";
import { UserService } from "../user";
import { UpdateJobOfferDto } from "./dto/updateJobOffer.dto";
import { GetAllJobOfferDto } from "./dto/getAllJobOffers.dto";
import { Prisma } from "@prisma/client";
import { getOrderBy, searchByMode } from "src/common/utils/prisma";
import { Pagination } from "src/providers";

@Injectable()
export class JobOfferService {
    constructor(private readonly dbContext: PrismaService, private userService: UserService) { }
    private readonly logger: Logger = new Logger(JobOfferService.name);

    async getAllJobOffers(user: RequestUser, query: GetAllJobOfferDto) {
        const { search, city, skip, take, order } = query;
        const whereConditions: Prisma.Enumerable<Prisma.JobWhereInput> = [];
        if (search) {
            whereConditions.push({
                jobTitle: searchByMode(search),
            });
        }

        if (city) {
            whereConditions.push({
                company: {
                    address: searchByMode(city),
                }
            });
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
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            avatarUrl: true,

                        }
                    }
                }
            },
            ),
        ]);

        return Pagination.of({ take, skip }, total, jobs);
    }

    async createJobOffer(user: RequestUser, data: CreateJobOfferDto) {
        const userTmp = await this.userService.findUserById(user.id)
        const jobOffer = await this.dbContext.job.create({
            data: {
                ...data,
                deadline: new Date(data.deadline),
                companyId: userTmp.company.id,
                userId: user.id,
                status: 'ACTIVE'
            }
        })

        this.logger.log('Create the job', { jobOffer });
    }

    async updateJobOffer(user: RequestUser, id: string, data: UpdateJobOfferDto) {
        const updateJob = await this.dbContext.job.update({
            where: { id }, data,
        })
    }

    async deleteJobOffer(user: RequestUser, id: string) {
        const now = new Date().toISOString();
        const deleteJob = await this.dbContext.job.update({ where: { id }, data: { deletedAt: now } })
    }





}