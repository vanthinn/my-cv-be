import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  displayName: string;
}
