import { CompanyService } from './company.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guard";
import { CreateCompanyDto } from './dto/createCompanyDto.dto';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { RequestUser } from 'src/common';
import { UpdateCompanyDto } from './dto/updateCompanyDto.dto';
import { UUIDParam } from 'src/common/types/uuid-param';
import { getALLCompanyDto } from './dto/getAllCompanyDto.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly CompanyService: CompanyService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCompany(@ReqUser() user: RequestUser, @Query() query: getALLCompanyDto) {
        return this.CompanyService.getAllCompany(user, query)
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getCompanyById(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.CompanyService.findCompanyById(id)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Post()
    async createCompany(@ReqUser() user: RequestUser, @Body() data: CreateCompanyDto) {
        return this.CompanyService.createCompany(user, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Put(":id")
    async updateCompany(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Body() data: UpdateCompanyDto) {
        return this.CompanyService.updateCompany(user, id, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async deleteCompany(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.CompanyService.deleteCompany(user, id)
    }
}