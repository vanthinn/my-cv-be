import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsISO8601, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { UserRole } from 'src/common/types/enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'username of the user',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'username of the user',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'username of the user',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'username of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'username of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(11)
  @IsMobilePhone()
  phoneNumber: string;

  @ApiProperty({
    description: 'Date of birth',
  })
  @IsOptional()
  @IsISO8601()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Gender of user',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiPropertyOptional({
    description: 'Address of user',
  })
  @IsOptional()
  @MaxLength(255)
  @IsString()
  address: string;

  // @ApiProperty({
  //   description: 'Role names',
  //   example: [UserRole.ADMIN],
  // })
  // @IsEnum(UserRole, { each: true })
  // role: string;
}
