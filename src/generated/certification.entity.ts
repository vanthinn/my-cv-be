import { ApiProperty } from '@nestjs/swagger';
import { CvEntity } from './cv.entity';

export class CertificationEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  displayName: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date: Date;
  @ApiProperty({
    required: false,
  })
  CVId: string;
  @ApiProperty({
    required: false,
  })
  CV?: CvEntity;
}
