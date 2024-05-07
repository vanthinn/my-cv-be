import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { CompanyEntity } from './company.entity';

export class EmployerEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
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
  firstName: string;
  @ApiProperty({
    required: false,
  })
  lastName: string;
  @ApiProperty({
    required: false,
  })
  email: string;
  @ApiProperty({
    required: false,
  })
  password: string;
  @ApiProperty({
    required: false,
  })
  phoneNumber: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  gender: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  dateOfBirth: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  refreshToken: string | null;
  @ApiProperty({
    required: false,
  })
  roleId: string;
  @ApiProperty({
    required: false,
  })
  role?: RoleEntity;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  Company?: CompanyEntity | null;
}
