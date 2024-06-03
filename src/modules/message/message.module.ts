import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { DatabaseModule } from 'src/database';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule { }