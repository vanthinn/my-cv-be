import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TenantService } from "./tenant.service";

@ApiTags('Tenant')
// @ApiBearerAuth()
@Controller('tenant')
// @UseGuards(AccessTokenGuard)
export class TenantController {
    constructor(private readonly tenantService: TenantService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllTenants() {
        return await this.tenantService.getAllTenants()
    }

    @Post()
    async createTenant(@Body() data: { code: string }) {
        return await this.tenantService.createTenant(data)
    }

}