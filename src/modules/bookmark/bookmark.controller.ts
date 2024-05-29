import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guard";
import { BookmarkService } from "./bookmark.service";
import { ReqUser } from "src/common/decorator/request-user.decorator";
import { RequestUser } from "src/common";
import { UUIDParam } from "src/common/types/uuid-param";

@ApiTags('Bookmark')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@Controller('bookmark')
export class BookMarkController {
    constructor(private readonly bookService: BookmarkService) {

    }

    @Get()
    async getBookmarkOfUser(@ReqUser() user: RequestUser) {
        return this.bookService.getAllBookmarks(user)
    }

    @Post()
    async createBookmark(@ReqUser() user: RequestUser, @Body() { id }: UUIDParam) {
        return this.bookService.createBookMark(user, id)
    }

    @Delete(':id')
    async deleteBookMark(@ReqUser() user: RequestUser, @Param() { id }: UUIDParam) {
        return this.bookService.deleteBookMark(user, id)
    }
}