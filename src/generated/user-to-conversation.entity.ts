import { ApiProperty } from '@nestjs/swagger';
import { ConversationEntity } from './conversation.entity';
import { UserEntity } from './user.entity';
import { MessageEntity } from './message.entity';

export class UserToConversationEntity {
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
    nullable: true,
  })
  displayName: string | null;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastReadMessageId: string | null;
  @ApiProperty({
    required: false,
  })
  conversation?: ConversationEntity;
  @ApiProperty({
    required: false,
  })
  user?: UserEntity;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  lastReadMessage?: MessageEntity | null;
  @ApiProperty({
    isArray: true,
    required: false,
  })
  messages?: MessageEntity[];
}
