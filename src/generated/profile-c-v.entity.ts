import { ApiProperty } from '@nestjs/swagger';
import { CvEntity } from './cv.entity';

export class ProfileCVEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  firstName: string;
  @ApiProperty({
    required: false,
  })
  lastName: string;
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
  gender: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  dateOfBirth: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatarUrl: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  facebook: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  linkedin: string | null;
  @ApiProperty({
    required: false,
  })
  CVId: string;
  @ApiProperty({
    required: false,
  })
  CV?: CvEntity;
}
