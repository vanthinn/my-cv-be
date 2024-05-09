import { ApiProperty } from '@nestjs/swagger';
import { CvEntity } from './cv.entity';

export class EducationEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  schoolName: string;
  @ApiProperty({
    required: false,
  })
  location: string;
  @ApiProperty({
    required: false,
  })
  state: string;
  @ApiProperty({
    required: false,
  })
  fieldOfStudy: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  GPA: string | null;
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
