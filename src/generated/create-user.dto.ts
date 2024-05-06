import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  gender?: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    default: 'now',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  address?: string;
}
