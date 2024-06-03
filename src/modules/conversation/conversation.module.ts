import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from 'src/database';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user';
import { ConversationController } from './conversaiton.controller';

@Module({
    imports: [DatabaseModule, MessageModule, EventEmitterModule, UserModule],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationModule { }