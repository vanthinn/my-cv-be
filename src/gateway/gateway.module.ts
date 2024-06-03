import { Module } from '@nestjs/common';
import { EventGateway } from './gateway';
import { GatewaySessionManager } from './gateway.session';
import { AuthModule } from 'src/modules/auth';
import { ConversationModule } from 'src/modules/conversation/conversation.module';
import { MessageModule } from 'src/modules/message/message.module';

@Module({
    imports: [MessageModule, AuthModule, ConversationModule],
    providers: [EventGateway, GatewaySessionManager],
    exports: [EventGateway],
})
export class GatewayModule { }