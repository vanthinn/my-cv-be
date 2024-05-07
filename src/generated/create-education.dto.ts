import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  schoolName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  GPA: string;
}
