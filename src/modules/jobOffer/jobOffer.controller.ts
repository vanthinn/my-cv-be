import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guard";
import { JobOfferService } from "./jobOffer.service";
import { RequestUser } from "src/common";
import { ReqUser } from "src/common/decorator/request-user.decorator";
import { CreateJobOfferDto } from "./dto/createJobOffer.dto";
import { UpdateJobOfferDto } from "./dto/updateJobOffer.dto";
import { UUIDParam } from "src/common/types/uuid-param";
import { query } from "express";
import { GetAllJobOfferDto } from "./dto/getAllJobOffers.dto";

@ApiTags('Job-offer')
@Controller('job-offer')
export class JobOfferController {
    constructor(private readonly JobOfferService: JobOfferService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllJobOffers(@ReqUser() user: RequestUser, @Query() query: GetAllJobOfferDto) {
        return this.JobOfferService.getAllJobOffers(user, query)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Post()
    async createJobOffer(@ReqUser() user: RequestUser, @Body() data: CreateJobOfferDto) {
        return this.JobOfferService.createJobOffer(user, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Put(":id")
    async updateJobOffer(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Body() data: UpdateJobOfferDto) {
        return this.JobOfferService.updateJobOffer(user, id, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Patch(":id")
    async updateStatusJobOffer(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Body() data: UpdateJobOfferDto) {
        return this.JobOfferService.updateJobOffer(user, id, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Delete(":id")
    async deleteJobOffer(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.JobOfferService.deleteJobOffer(user, id)
    }

}