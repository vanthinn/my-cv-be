import { ApiProperty } from '@nestjs/swagger';

export class JobApplyDto {
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
