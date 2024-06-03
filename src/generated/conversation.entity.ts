import { ApiProperty } from '@nestjs/swagger';
import { UserToConversationEntity } from './user-to-conversation.entity';
import { MessageEntity } from './message.entity';

export class ConversationEntity {
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
  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastMessageId: string | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  users?: UserToConversationEntity[];
  @ApiProperty({
    isArray: true,
    required: false,
  })
  messages?: MessageEntity[];
  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastMessage?: MessageEntity | null;
}
