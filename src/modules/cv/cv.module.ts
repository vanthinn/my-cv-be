import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database';
import { CVController } from './cv.controller';
import { CVService } from './cv.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CVController],
    providers: [CVService],
    exports: [CVService],
})
export class CVModule { }