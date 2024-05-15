import { JobApplyService } from './jobApply.service';
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequestUser } from 'src/common';
import { CreateJobApplyDto } from './dto/createJobApply.dto';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { AccessTokenGuard } from 'src/guard';

@ApiTags('Job-apply')
@Controller('job-apply')
export class JobApplyController {
    constructor(private readonly JobApplyService: JobApplyService) { }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth()
    @Post()
    async applyJob(@ReqUser() user: RequestUser, @Body() data: CreateJobApplyDto) {
        return this.JobApplyService.applyJob(user, data)
    }
}