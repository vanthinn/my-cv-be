import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class VerificationTokenEntity {
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
  userId: string;
  @ApiProperty({
    required: false,
  })
  token: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  expiresAt: Date;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
}
