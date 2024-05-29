import { CVService } from './cv.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RequestUser } from 'src/common';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { AccessTokenGuard } from "src/guard";
import { createEducationDto } from './dto/ceateEducation.dto';
import { CreateCVDto } from './dto/createCV.dto';
import { UpdateCVDto } from './dto/updateCV.dto';
import { UUIDParam } from 'src/common/types/uuid-param';

@ApiTags('CV')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('cv')
export class CVController {
    constructor(private readonly CVService: CVService) { }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getCVById(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.CVService.getCVById(user, id)
    }
    @Post()
    async createCV(@ReqUser() user: RequestUser, @Body() data: CreateCVDto) {
        return this.CVService.createCV(user, data)
    }

    @Put(":id")
    async updateCV(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Body() data: UpdateCVDto) {
        return this.CVService.updateCV(user, id, data)
    }

    @Patch(":id")
    async patchCV(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam, @Body() data: UpdateCVDto) {
        return this.CVService.patchCVById(user, id, data)
    }

    @Delete(":id")
    async deleteCV(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.CVService.deleteCVById(user, id)
    }
}