import { Injectable, Logger } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";
import { CreateJobOfferDto } from "./dto/createJobOffer.dto";
import { UserService } from "../user";
import { UpdateJobOfferDto } from "./dto/updateJobOffer.dto";

@Injectable()
export class JobOfferService {
    constructor(private readonly dbContext: PrismaService, private userService: UserService) { }
    private readonly logger: Logger = new Logger(JobOfferService.name);

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