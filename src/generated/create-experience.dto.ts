import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  position: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  company: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  state?: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
