import { Injectable } from "@nestjs/common";
import { RequestUser } from "src/common";
import { PrismaService } from "src/database/services";

@Injectable()
export class BookmarkService {
    constructor(private readonly dbContext: PrismaService) {
    }

    async getAllBookmarks(user: RequestUser) {
        const listBookmarks = await this.dbContext.jobBookmark.findMany({
            where: {
                userId: user.id,
            }, select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                job: {
                    select: {
                        id: true,
                        jobTitle: true,
                        deadline: true,
                        education: true,
                        experience: true,
                        jobType: true,
                        salary: true,
                        createdAt: true,
                        updatedAt: true,
                        company: {
                            select: {
                                id: true,
                                address: true,
                                logoUrl: true,
                                displayName: true
                            }
                        }
                    },

                }
            }
        })
        return listBookmarks

    }

    async createBookMark(user: RequestUser, id: string) {
        const bookMark = await this.dbContext.jobBookmark.create({
            data: { jobId: id, userId: user.id },
        })
    }

    async deleteBookMark(user: RequestUser, id: string) {
        await this.dbContext.jobBookmark.deleteMany({ where: { jobId: id, userId: user.id } })
    }
}