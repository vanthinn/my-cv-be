import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { AccessTokenGuard } from 'src/guard';
import { GetUsersQueryDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { RequestUser } from 'src/common';
import { ReqUser } from 'src/common/decorator/request-user.decorator';
import { UUIDParam } from 'src/common/types/uuid-param';
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('user')
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

  @ApiOperation({
    description: 'Update a user',
  })
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() { id }: UUIDParam, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @ApiOperation({
    description: 'Get cv a user',
  })
  @Get("cv")
  @HttpCode(HttpStatus.OK)
  async getCvOfUser(@ReqUser() user: RequestUser) {
    return this.userService.getCVOfUser(user.id);
  }

}
