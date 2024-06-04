import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVerificationTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  expiresAt: Date;
}
