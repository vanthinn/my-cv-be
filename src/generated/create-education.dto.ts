import { Prisma } from '@prisma/client';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';
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
    type: 'number',
    format: 'double',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDecimal()
  GPA?: Prisma.Decimal;
}
