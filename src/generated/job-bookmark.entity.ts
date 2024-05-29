import { ApiProperty } from '@nestjs/swagger';
import { JobEntity } from './job.entity';
import { UserEntity } from './user.entity';

export class JobBookmarkEntity {
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
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  deletedAt: Date | null;
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
  userId: string;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
}
