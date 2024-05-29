import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}
