import { updateStatusDto } from './dto/updateStatus.dto';
import { JobApplyService } from './jobApply.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequestUser } from 'src/common';
import { CreateJobApplyDto } from './dto/createJobApply.dto';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { AccessTokenGuard } from 'src/guard';
import { UUIDParam } from 'src/common/types/uuid-param';
import { getJObApplyByJobIdDto } from './dto/getJobApplyByJobId.dto';
import { getAllJobApplyDto } from './dto/getAllJobApply.dto';

@ApiTags('Job-apply')
@Controller('job-apply')
export class JobApplyController {
    constructor(private readonly JobApplyService: JobApplyService) { }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get()
    async getAllJobApply(@ReqUser() user: RequestUser, @Query() query: getAllJobApplyDto) {
        return this.JobApplyService.getAllJobApply(user, query);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Post()
    async applyJob(@ReqUser() user: RequestUser, @Body() data: CreateJobApplyDto) {
        return this.JobApplyService.applyJob(user, data)
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Get('/job/:id')
    async getJobApplyByJobId(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Query() query: getJObApplyByJobIdDto) {
        return this.JobApplyService.getJobApplyByJobId(user, id, query);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Patch('/update-status')
    async updateStatus(@ReqUser() user: RequestUser, @Body() data: updateStatusDto) {
        return this.JobApplyService.updateStatus(user, data);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Delete(':id')
    async deleteJobApply(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.JobApplyService.deleteJobApply(user, id);
    }


}