import { ApiProperty } from '@nestjs/swagger';
import { CvEntity } from './cv.entity';

export class ExperienceEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  position: string;
  @ApiProperty({
    required: false,
  })
  company: string;
  @ApiProperty({
    required: false,
  })
  location: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  state: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  startDate: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  endDate: Date;
  @ApiProperty({
    required: false,
  })
  CVId: string;
  @ApiProperty({
    required: false,
  })
  CV?: CvEntity;
}
