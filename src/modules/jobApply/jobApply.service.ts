import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";
import { CreateJobApplyDto } from "./dto/createJobApply.dto";
import { UserService } from "../user";
import { isNotEmpty } from "class-validator";
import { UpdateJobApplyDto } from "src/generated";

@Injectable()
export class JobApplyService {
    constructor(private readonly dbContext: PrismaService, private UserService: UserService) { }
    private readonly logger: Logger = new Logger(JobApplyService.name);

    async applyJob(user: RequestUser, data: CreateJobApplyDto) {
        const applyJobExisted = await this.findJobApplyByUser(user.email)
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

    async findJobApplyByUser(email: string) {
        const jobApply = await this.dbContext.jobApply.findFirst({ where: { email } })
        return jobApply
    }

    async updateStatusJobApply(user: RequestUser, id: string, data: UpdateJobApplyDto) {
        const now = new Date().toISOString()
        const updateJobApply = await this.dbContext.jobApply.update({
            where: { id }, data: { status: data.status, updatedAt: now }
        })
    }
}