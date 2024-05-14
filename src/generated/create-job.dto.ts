import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  experience: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  salary: string;
  @ApiProperty({
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobType: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  education?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  deletedAt?: Date;
}
