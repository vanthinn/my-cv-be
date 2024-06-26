import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  displayName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  logoUrl?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  fieldOfActivity?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  scale?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  website?: string | null;
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
