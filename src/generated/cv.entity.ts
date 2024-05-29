import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { ExperienceEntity } from './experience.entity';
import { ProfileCVEntity } from './profile-c-v.entity';
import { EducationEntity } from './education.entity';
import { CertificationEntity } from './certification.entity';
import { LanguageEntity } from './language.entity';
import { JobApplyEntity } from './job-apply.entity';

export class CvEntity {
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
    nullable: true,
  })
  image: string | null;
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
    isArray: true,
    required: false,
  })
  skills: string[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  interests: string[];
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
    isArray: true,
    required: false,
  })
  experiences?: ExperienceEntity[];
  @ApiProperty({
    required: false,
    nullable: true,
  })
  profile?: ProfileCVEntity | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  education?: EducationEntity | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  certificates?: CertificationEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  languages?: LanguageEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobApply?: JobApplyEntity[];
}
