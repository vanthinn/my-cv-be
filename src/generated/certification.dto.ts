import { ApiProperty } from '@nestjs/swagger';

export class CertificationDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  displayName: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  date: Date;
}
