import { ApiProperty } from '@nestjs/swagger';
import { ConversationEntity } from './conversation.entity';
import { UserToConversationEntity } from './user-to-conversation.entity';

export class MessageEntity {
  @ApiProperty({
    required: false,
  })
  id: string;
  @ApiProperty({
    required: false,
  })
  conversationId: string;
  @ApiProperty({
    required: false,
  })
  userId: string;
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
  })
  content: string;
  @ApiProperty({
    required: false,
  })
  type: string;
  @ApiProperty({
    required: false,
  })
  conversation?: ConversationEntity;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastMessageOfConversation?: ConversationEntity | null;
  @ApiProperty({
    required: false,
  })
  author?: UserToConversationEntity;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  readBy?: UserToConversationEntity[];
}
