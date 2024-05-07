import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  displayName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  level: string;
}
