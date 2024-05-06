import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  resourceName?: string | null;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  displayName?: string;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string | null;
}
