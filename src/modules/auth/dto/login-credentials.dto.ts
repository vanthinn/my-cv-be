import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'thinh209202@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
