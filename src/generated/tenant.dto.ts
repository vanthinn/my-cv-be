import { ApiProperty } from '@nestjs/swagger';

export class TenantDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  code: string;
}
