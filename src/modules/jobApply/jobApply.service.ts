import { BadRequestException, Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";
import { CreateJobApplyDto } from "./dto/createJobApply.dto";
import { UserService } from "../user";
import { isNotEmpty } from "class-validator";
import { UpdateJobApplyDto } from "src/generated";
import { getJObApplyByJobIdDto } from "./dto/getJobApplyByJobId.dto";
import { Prisma } from "@prisma/client";
import { searchByMode } from "src/common/utils/prisma";
import { Pagination } from "src/providers";
import { updateStatusDto } from "./dto/updateStatus.dto";
import { getAllJobApplyDto } from "./dto/getAllJobApply.dto";

@Injectable()
export class JobApplyService {
    constructor(
        private readonly dbContext: PrismaService,
        @Inject(forwardRef(() => UserService))
        private UserService: UserService) { }
    private readonly logger: Logger = new Logger(JobApplyService.name);

    async applyJob(user: RequestUser, data: CreateJobApplyDto) {
        const applyJobExisted = await this.findJobApplyByUser(user.email, data.jobId)
        if (applyJobExisted) {
            throw new BadRequestException('You have already applied for this job.');
        }

        const cvOfUser = await this.UserService.getCVMainOfUser(user.id)
        if (!cvOfUser) {
            throw new BadRequestException('You do not have any CVs.');
        }


        const jobApply = await this.dbContext.jobApply.create({
            data: {
                candidateName: user.fullName,
                email: user.email,
                status: 'PENDING',
                jobId: data.jobId,
                CVId: cvOfUser.id
            }
        })


    }



    async findJobApplyByUser(email: string, jobId: string) {
        const jobApply = await this.dbContext.jobApply.findFirst({ where: { email, jobId } })
        return jobApply
    }

    // async updateStatusJobApply(user: RequestUser, id: string, data: UpdateJobApplyDto) {
    //     const now = new Date().toISOString()
    //     const updateJobApply = await this.dbContext.jobApply.update({
    //         where: { id }, data: { status: data.status, updatedAt: now }
    //     })
    // }

    async deleteJobApply(user: RequestUser, id: string) {
        const now = new Date().toISOString()
        const jobApply = await this.dbContext.jobApply.update({ where: { id: id }, data: { deletedAt: now } })
    }

    async getAllJobApply(user: RequestUser, query: getAllJobApplyDto) {
        const { search, skip, take, status, companyId } = query

        const whereConditions: Prisma.Enumerable<Prisma.JobApplyWhereInput> = [];
        if (search) {
            whereConditions.push({
                OR: [
                    { candidateName: searchByMode(search) },
                    { job: { jobTitle: searchByMode(search) } }
                ]
            });
        }

        if (status) {
            whereConditions.push({
                status: status,
            });
        }

        if (companyId) {
            whereConditions.push({
                job: {
                    companyId: companyId,
                },
            });
        }

        const [total, jobApplies] = await Promise.all([
            this.dbContext.jobApply.count({
                where: {
                    AND: whereConditions,
                },
            }),
            this.dbContext.jobApply.findMany({
                where: {
                    AND: whereConditions,
                },
                skip,
                take,
                select: {
                    id: true,
                    candidateName: true,
                    email: true,
                    createdAt: true,
                    status: true,
                    CV: {
                        select: {
                            id: true,
                            image: true,
                        }
                    },
                    job: {
                        select: {
                            jobTitle: true,
                        }
                    }
                }
            },
            ),
        ]);

        return Pagination.of({ take, skip }, total, jobApplies);
    }

    async getJobApplyByJobId(user: RequestUser, id: string, query: getJObApplyByJobIdDto) {
        const { search, skip, take, status } = query

        const whereConditions: Prisma.Enumerable<Prisma.JobApplyWhereInput> = [];
        if (search) {
            whereConditions.push({
                candidateName: searchByMode(search),
            });
        }

        if (status) {
            whereConditions.push({
                status: status,
            });
        }

        const [total, jobApplies] = await Promise.all([
            this.dbContext.jobApply.count({
                where: {
                    jobId: id,
                    AND: whereConditions,
                },
            }),
            this.dbContext.jobApply.findMany({
                where: {
                    jobId: id,
                    AND: whereConditions,
                },
                skip,
                take,
                select: {
                    id: true,
                    candidateName: true,
                    email: true,
                    createdAt: true,
                    status: true,
                    CV: {
                        select: {
                            id: true,
                            image: true,
                        }
                    },
                    job: {
                        select: {
                            jobTitle: true,
                        }
                    }
                }
            },
            ),
        ]);

        return Pagination.of({ take, skip }, total, jobApplies);
    }

    async updateStatus(user: RequestUser, data: updateStatusDto) {
        const { id, status } = data
        const now = new Date().toISOString()
        const jobApply = await this.dbContext.jobApply.findUnique({
            where: {
                id
            },
            include: {
                job: {
                    include: {
                        user: true,
                    }
                },

            }

        })


        await this.dbContext.$transaction(async (tx) => {
            await tx.jobApply.update({ where: { id: id }, data: { status: status, updatedAt: now } })

            if (status === 'APPROVED') {
                const requesterId = jobApply.job.user.id;
                const candidate = await tx.user.findFirst({
                    where: {
                        email: jobApply.email
                    }
                })

                const checkExitedConversation = await tx.conversation.findFirst({
                    where: {
                        AND: [
                            {
                                users: {
                                    some: {
                                        userId: requesterId
                                    }
                                }
                            },
                            {
                                users: {
                                    some: {
                                        userId: candidate.id
                                    }
                                }
                            }
                        ]
                    }
                });

                if (!checkExitedConversation) {
                    await tx.conversation.create({
                        data: {
                            users: {
                                createMany: {
                                    data: [{ userId: requesterId }, { userId: candidate.id }]
                                }
                            }
                        }
                    });
                }
                else {
                    await tx.conversation.update({
                        where: {
                            id: checkExitedConversation.id
                        },
                        data: { updatedAt: now }
                    })
                }
            }
        })


    }
}