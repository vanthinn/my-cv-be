import { ApiProperty } from '@nestjs/swagger';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

export class RoleToPermissionEntity {
  @ApiProperty({
    required: false,
  })
  roleId: string;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    required: false,
  })
  permissionId: number;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  updatedAt: Date;
  @ApiProperty({
    required: false,
  })
  permission?: PermissionEntity;
  @ApiProperty({
    required: false,
  })
  role?: RoleEntity;
}
