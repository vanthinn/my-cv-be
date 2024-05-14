import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCvDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  template: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fontStyle?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fontSize?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  color?: string;
  @ApiProperty({
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  skills: string[];
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  summary?: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}
