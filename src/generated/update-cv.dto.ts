import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCvDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  template?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fontStyle?: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  fontSize?: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  color?: string | null;
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
    nullable: true,
  })
  @IsOptional()
  @IsString()
  summary?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  state?: boolean;
}
