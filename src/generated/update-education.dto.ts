import { Prisma } from '@prisma/client';
import { IsDecimal, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEducationDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  schoolName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  fieldOfStudy?: string;
  @ApiProperty({
    type: 'number',
    format: 'double',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDecimal()
  GPA?: Prisma.Decimal | null;
}
