import { ApiProperty } from '@nestjs/swagger';

export class CvDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  template: string;
  @ApiProperty({
    required: false,
  })
  title: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  fontStyle: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  fontSize: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  color: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  skills: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  summary: string | null;
  @ApiProperty({
    required: false,
  })
  state: boolean;
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
  })
  deletedAt: Date;
}
