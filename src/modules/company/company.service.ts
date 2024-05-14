import { Injectable, Logger } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";
import { CreateCompanyDto } from "./dto/createCompanyDto.dto";
import { UserService } from "../user";
import { UpdateCompanyDto } from "./dto/updateCompanyDto.dto";


@Injectable()
export class CompanyService {
    constructor(private readonly dbContext: PrismaService, private userService: UserService) { }
    private readonly logger: Logger = new Logger(CompanyService.name);

    async createCompany(user: RequestUser, data: CreateCompanyDto) {
        const company = await this.dbContext.company.create({
            data: data,
        })
        await this.userService.updateCompany(user.id, company.id)
    }

    async updateCompany(user: RequestUser, id: string, data: UpdateCompanyDto) {
        const company = await this.dbContext.company.update({ where: { id }, data })
        this.logger.log('Updated the company ', { company });
    }

    async deleteCompany(user: RequestUser, id: string) {
        const now = new Date().toISOString();
        const deleteCompanyDto = await this.dbContext.company.update({ where: { id }, data: { deletedAt: now } })
    }

}