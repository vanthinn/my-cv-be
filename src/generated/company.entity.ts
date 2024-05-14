import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { JobEntity } from './job.entity';

export class CompanyEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  displayName: string;
  @ApiProperty({
    required: false,
  })
  address: string;
  @ApiProperty({
    required: false,
  })
  logoUrl: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl: string | null;
  @ApiProperty({
    required: false,
  })
  email: string;
  @ApiProperty({
    required: false,
  })
  phoneNumber: string;
  @ApiProperty({
    required: false,
  })
  fieldOfActivity: string;
  @ApiProperty({
    required: false,
  })
  scale: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  description: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  website: string | null;
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
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  deletedAt: Date | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  users?: UserEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobs?: JobEntity[];
}
