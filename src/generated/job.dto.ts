import { ApiProperty } from '@nestjs/swagger';

export class JobDto {
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
}
