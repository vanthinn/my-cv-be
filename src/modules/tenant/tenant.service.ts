import { Injectable, NotFoundException } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";

@Injectable()
export class TenantService {
    constructor(private readonly dbContext: PrismaService) { }

    async getAllTenants() {
        const tenant = await this.dbContext.tenant.findMany()
        return tenant
    }
    async createTenant(data: { code: string }) {
        // const { code } = data
        const tenant = await this.dbContext.tenant.create({ data: data })
    }

    async getTenantById(id: string) {
        const tenant = await this.dbContext.tenant.findUnique({ where: { id: id } })
        return tenant
    }

    async getCurrentTenant(user: RequestUser) {
        const tenant = await this.dbContext.tenant.findUnique({ where: { id: user.tenantId } })
        if (!tenant) {
            throw new NotFoundException('Not found tenant')
        }

        return tenant
    }
}
