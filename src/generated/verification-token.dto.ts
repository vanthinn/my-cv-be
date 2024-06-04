import { ApiProperty } from '@nestjs/swagger';

export class VerificationTokenDto {
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
  token: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  expiresAt: Date;
}
