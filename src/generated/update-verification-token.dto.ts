import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVerificationTokenDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  token?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: Date;
}
