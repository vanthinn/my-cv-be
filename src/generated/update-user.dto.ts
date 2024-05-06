import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;
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
  password?: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  gender?: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string | null;
}
