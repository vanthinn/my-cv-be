import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database";
import { BookmarkService } from "./bookmark.service";
import { BookMarkController } from "./bookmark.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [BookMarkController],
    providers: [BookmarkService],
    exports: [BookmarkService],
})
export class BookmarkModule { }
