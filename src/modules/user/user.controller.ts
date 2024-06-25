import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { AccessTokenGuard } from 'src/guard';
import { GetUsersQueryDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { RequestUser } from 'src/common';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { UUIDParam } from 'src/common/types/uuid-param';
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({
    description: 'Get all users',
  })
  @Get()
  async getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.userService.getAllUsers(query);
  }

  @ApiOperation({
    description: 'get current user',
  })
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@ReqUser() user: RequestUser) {
    return this.userService.findUserById(user.id);
  }


  @Get('job-apply/history')
  async getJobApplyHistory(@ReqUser() user: RequestUser) {
    return this.userService.getAllJobApplyOfUser(user)
  }

  @Patch('company')
  async updateUserCompany(@ReqUser() user: RequestUser, @Body() { id }: UUIDParam) {
    return this.userService.updateUserCompany(user.id, id);
  }

  @ApiOperation({
    description: 'Get cv a user',
  })
  @Get("cv")
  @HttpCode(HttpStatus.OK)
  async getCvOfUser(@ReqUser() user: RequestUser) {
    return this.userService.getAllCVOfUser(user.id);
  }

  @ApiOperation({
    description: 'get current user',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
    return this.userService.findUserById(id);
  }

  @ApiOperation({
    description: 'Update a user',
  })
  @Put(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() { id }: UUIDParam, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(":id")
  async deleteCV(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
    return this.userService.deleteCVById(user, id)
  }

}
