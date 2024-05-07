import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  displayName: string;
  @ApiProperty({
    required: false,
  })
  level: string;
}
