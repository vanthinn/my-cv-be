import { ApiProperty } from '@nestjs/swagger';
import { JobEntity } from './job.entity';
import { CvEntity } from './cv.entity';

export class JobApplyEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  candidateName: string;
  @ApiProperty({
    required: false,
  })
  email: string;
  @ApiProperty({
    required: false,
  })
  status: string;
  @ApiProperty({
    required: false,
  })
  jobId: string;
  @ApiProperty({
    required: false,
  })
  job?: JobEntity;
  @ApiProperty({
    required: false,
  })
  CVId: string;
  @ApiProperty({
    required: false,
  })
  CV?: CvEntity;
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
}
