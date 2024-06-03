import { ApiProperty } from '@nestjs/swagger';

export class ConversationDto {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  createdAt: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    required: false,
  })
  updatedAt: Date;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  displayName: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  avatarUrl: string | null;
}
