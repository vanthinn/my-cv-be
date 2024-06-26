import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateExperienceDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  position?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  company?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  state?: boolean | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
