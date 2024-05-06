import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { AccessTokenGuard } from 'src/guard';
import { RoleService } from './role.service';
import { CreateRoleDto, RoleQueryParam, UpdateRoleDto } from './dto';
@ApiTags('Role')
// @UseGuards(AccessTokenGuard)
// @ApiBearerAuth()
@Controller('role')
// @UseGuards(AccessTokenGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Post()
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        return await this.roleService.createRole(createRoleDto);
    }

    // @Roles(UserRole.ADMIN)
    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateRoleById(
        @Param() { id }: RoleQueryParam,
        @Body() body: UpdateRoleDto,
    ) {
        return await this.roleService.updateRole(id, body);
    }
}
