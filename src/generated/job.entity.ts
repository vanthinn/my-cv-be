import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
import { JobApplyEntity } from './job-apply.entity';
import { JobBookmarkEntity } from './job-bookmark.entity';

export class JobEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  jobTitle: string;
  @ApiProperty({
    required: false,
  })
  experience: string;
  @ApiProperty({
    required: false,
  })
  salary: string;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  skills: string[];
  @ApiProperty({
    required: false,
  })
  jobType: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  education: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  deadline: Date;
  @ApiProperty({
    required: false,
  })
  description: string;
  @ApiProperty({
    required: false,
  })
  status: string;
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
    required: false,
  })
  userId: string;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
  @ApiProperty({
    required: false,
  })
  companyId: string;
  @ApiProperty({
    required: false,
  })
  company?: CompanyEntity;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobApply?: JobApplyEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobBookmarks?: JobBookmarkEntity[];
}
