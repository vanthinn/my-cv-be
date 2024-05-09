import { CVService } from './cv.service';
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequestUser } from 'src/common';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { AccessTokenGuard } from "src/guard";
import { createEducationDto } from './dto/ceateEducation.dto';
import { CreateCVDto } from './dto/createCV.dto';

@ApiTags('CV')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('cv')
export class CVController {
    constructor(private readonly CVService: CVService) { }

    @Post()
    async createCV(@ReqUser() user: RequestUser, @Body() data: CreateCVDto) {
        return this.CVService.createCV(user, data)
    }

}