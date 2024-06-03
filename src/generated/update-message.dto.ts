import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;
}
