import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobApplyDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  candidateName?: string;
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
