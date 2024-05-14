import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  jobTitle?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  experience?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  salary?: string;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  jobType?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  education?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  deletedAt?: Date | null;
}
