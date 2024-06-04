import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { TenantEntity } from './tenant.entity';
import { CvEntity } from './cv.entity';
import { CompanyEntity } from './company.entity';
import { JobEntity } from './job.entity';
import { JobBookmarkEntity } from './job-bookmark.entity';
import { UserToConversationEntity } from './user-to-conversation.entity';
import { VerificationTokenEntity } from './verification-token.entity';

export class UserEntity {
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
  password: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatarUrl: string | null;
  @ApiProperty({
    required: false,
  })
  phoneNumber: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  gender: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  dateOfBirth: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  address: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  refreshToken: string | null;
  @ApiProperty({
    required: false,
  })
  roleId: string;
  @ApiProperty({
    required: false,
  })
  role?: RoleEntity;
  @ApiProperty({
    required: false,
  })
  tenantId: string;
  @ApiProperty({
    required: false,
  })
  tenant?: TenantEntity;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  cvs?: CvEntity[];
  @ApiProperty({
    required: false,
    nullable: true,
  })
  companyId: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  company?: CompanyEntity | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobs?: JobEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  jobBookmarks?: JobBookmarkEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  UserToConversation?: UserToConversationEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  tokens?: VerificationTokenEntity[];
}
