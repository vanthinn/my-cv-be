import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  GPA?: string;
}
