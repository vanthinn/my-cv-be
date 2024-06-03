import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/services';
import { Prisma } from '@prisma/client';
import { Pagination } from 'src/providers';

import { EventEmitter2 } from '@nestjs/event-emitter';
import { omit } from 'lodash';
import { getAuthorDisplayName, getConversationDisplayName, getOtherUserAvatar } from './utils/name';
import { RequestUser } from 'src/common';
import { GetMessageDto } from './dto/get-message.dto';
import { searchByMode } from 'src/common/utils/prisma';
import { GetConversationDto } from './dto/get-conversation.dto';
import { UserService } from '../user';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { MessageEvent } from '../../gateway/enum';
import { selectUser } from '../user/utils/select.utli';
import { CreateMessageDto } from '../message/dto/create-message.dto';
import { ConversationUserRequestBody } from './dto/conversation-user.dto';

@Injectable()
export class ConversationService {
    constructor(
        private readonly dbContext: PrismaService,
        private readonly event: EventEmitter2,
        private readonly userService: UserService,
    ) { }

    private readonly logger = new Logger(ConversationService.name);

    async create(body: CreateConversationDto, user: RequestUser) {
        const { displayName, userIds, avatarUrl } = body;

        if (userIds.includes(user.id)) {
            throw new BadRequestException(
                'You cannot add yourself in the conversation',
            );
        }

        // await this.userService.validateUserIds(userIds);
        const userIdsData = [user.id, ...userIds];
        const createUsers: Prisma.UserToConversationCreateNestedManyWithoutConversationInput =
        {
            createMany: {
                data: userIdsData.map((userId) => ({
                    userId,
                })),
            },
        };

        const conversation = await this.dbContext.conversation.create({
            data: {
                avatarUrl,
                displayName,
                users: createUsers,
            },
            include: {
                users: {
                    select: {
                        userId: true,
                        displayName: true,
                        user: selectUser,
                    },
                },
            },
        });

        this.logger.log('Create a new conversation successfully', { conversation });
        this.event.emit(MessageEvent.CONVERSATION_CREATED, conversation);

        return conversation;
    }

    async getAllConversations(user: RequestUser, query: GetConversationDto) {
        const { skip, take, search } = query;
        const andWhereConditions: Prisma.Enumerable<Prisma.ConversationWhereInput> =
            [
                {
                    users: {
                        some: {
                            userId: user.id,
                        },
                    },
                },
            ];

        if (search) {
            andWhereConditions.push({
                displayName: searchByMode(search),
            });
        }

        const [conversations, total] = await Promise.all([
            this.dbContext.conversation.findMany({
                where: {
                    AND: andWhereConditions,
                },
                skip,
                take,
                select: {
                    avatarUrl: true,
                    id: true,
                    displayName: true,
                    lastMessage: {
                        select: {
                            id: true,
                            conversationId: true,
                            type: true,
                            createdAt: true,
                            updatedAt: true,
                            userId: true,
                            content: true,
                            author: {
                                select: {
                                    user: selectUser,
                                },
                            },
                        },
                    },
                    users: {
                        select: {
                            lastReadMessageId: true,
                            userId: true,
                            displayName: true,
                            user: selectUser,
                        },
                    },
                },
                orderBy: {
                    updatedAt: Prisma.SortOrder.desc,
                },
            }),
            this.dbContext.conversation.count({
                where: {
                    AND: andWhereConditions,
                },
            }),
        ]);

        const mappedConversations = conversations.map((c) => {
            const readUser = c.users.find(({ userId }) => userId === user.id);
            return {
                ...c,
                isRead:
                    readUser.lastReadMessageId === null
                        ? true
                        : readUser.lastReadMessageId === c.lastMessage?.id,
                avatarUrl: getOtherUserAvatar(c.users, user),
                displayName: getConversationDisplayName(c, user),
            };
        });

        return Pagination.of({ skip, take }, total, mappedConversations);
    }

    findOne(id: number) {
        return `This action returns a #${id} conversation`;
    }

    // update(id: number, updateConversationDto: UpdateConversationDto) {
    //     return `This action updates a #${id} conversation`;
    // }

    remove(id: number) {
        return `This action removes a #${id} conversation`;
    }

    async createMessage(
        conversationId: string,
        { content, type }: CreateMessageDto,
        user: RequestUser,
    ) {
        const conversation = await this.dbContext.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                users: {
                    select: {
                        userId: true,
                        id: true,
                    },
                },
            },
        });

        if (!conversation) throw new BadRequestException('Invalid conversation');

        if (conversation.users.every(({ userId }) => userId !== user.id))
            throw new BadRequestException(
                'You are not a member of this conversation',
            );

        const sender = conversation.users.find(({ userId }) => userId === user.id);

        const message = await this.dbContext.message.create({
            data: {
                conversationId,
                content,
                type,
                userId: sender.id,
                lastMessageOfConversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                readBy: {
                    connect: {
                        conversationId_userId: {
                            userId: user.id,
                            conversationId,
                        },
                    },
                },
            },
            select: {
                id: true,
                content: true,
                type: true,
                createdAt: true,
                updatedAt: true,
                conversationId: true,
                author: {
                    select: {
                        userId: true,
                        displayName: true,
                        user: selectUser,
                    },
                },
                conversation: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true,
                        users: {
                            select: {
                                userId: true,
                                displayName: true,
                                user: selectUser,
                            },
                        },
                    },
                },
            },
        });

        const mappedMessage = {
            ...message,
            conversation: {
                ...omit(message.conversation, 'users'),
                avatarUrl: getOtherUserAvatar(message.conversation.users, user),
                displayName: getConversationDisplayName(message.conversation, user),
            },
            author: {
                ...message.author.user,
                displayName: getAuthorDisplayName(message.author),
            },
        };

        this.event.emit('message.created', message);
        return mappedMessage;
    }

    async getMemberOfConversations(id: string) {
        const conversation = await this.dbContext.conversation.findUniqueOrThrow({
            where: {
                id,
            },
        });
        const members = await this.dbContext.userToConversation.findMany({
            where: {
                conversationId: id,
            },
            select: {

                userId: true,
                displayName: true,
                user: selectUser,
            },
        });

        return members.map((member) => ({
            ...member,
            displayName: getAuthorDisplayName(member),
        }));
    }

    async addUserToConversation(
        user: RequestUser,
        userIds: string[],
        conversationId: string,
    ) {
        const conversation = await this.dbContext.conversation.findUniqueOrThrow({
            where: { id: conversationId },
            select: {
                users: true,
            },
        });

        const userInConversation = conversation.users.some(
            ({ userId: conversationUserId }) => conversationUserId === user.id,
        );

        if (!userInConversation) {
            throw new BadRequestException('You are not in this conversation');
        }

        // const users = await this.userService.validateUserIds(userIds);

        const userToConversation = await this.dbContext.userToConversation.findMany(
            {
                where: {
                    conversationId,
                    AND: {
                        userId: {
                            in: userIds,
                        },
                    },
                },
            },
        );

        if (userToConversation.length > 0) {
            throw new BadRequestException(`One of the user is already in the forum`);
        }

        const data = userIds.map((userId) => {
            return {
                conversationId,
                userId,
            };
        });

        await this.dbContext.userToConversation.createMany({
            data,
        });
    }

    async updateUserInfo(
        conversationId: string,
        userId: string,
        user: RequestUser,
        body: ConversationUserRequestBody,
    ) {
        const { displayName } = body;

        const conversation =
            await this.dbContext.userToConversation.findUniqueOrThrow({
                where: {
                    conversationId_userId: {
                        userId,
                        conversationId,
                    },
                },
                select: {
                    conversation: {
                        include: {
                            users: true,
                        },
                    },
                },
            });

        const userInConversation = conversation.conversation.users.some(
            ({ userId: conversationUserId }) => conversationUserId === user.id,
        );

        if (!userInConversation) {
            throw new BadRequestException('You are not in this conversation');
        }

        await this.dbContext.userToConversation.update({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
            data: {
                displayName: displayName ?? null,
            },
        });
    }

    async deleteMemberOfConversation(
        userId: string,
        conversationId: string,
        user: RequestUser,
    ) {
        const conversation =
            await this.dbContext.userToConversation.findUniqueOrThrow({
                where: {
                    conversationId_userId: {
                        userId,
                        conversationId,
                    },
                },
                select: {
                    conversation: {
                        include: {
                            users: true,
                        },
                    },
                },
            });

        // if (
        //     conversation.conversation.type === ConversationType.CHAT ||
        //     conversation.conversation.forumId !== null
        // ) {
        //     throw new BadRequestException(
        //         'You cannot delete user of this type of conversation',
        //     );
        // }

        const userInConversation = conversation.conversation.users.some(
            ({ userId: conversationUserId }) => conversationUserId === user.id,
        );

        if (!userInConversation) {
            throw new BadRequestException('You are not in this conversation');
        }

        await this.dbContext.userToConversation.delete({
            where: {
                conversationId_userId: {
                    userId,
                    conversationId,
                },
            },
        });
    }

    async getAllMessagesOfConversation(
        id: string,
        user: RequestUser,
        query: GetMessageDto,
    ) {
        const conversation = await this.dbContext.conversation.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                users: true,
            },
        });

        if (conversation.users.every(({ userId }) => userId !== user.id)) {
            throw new BadRequestException(
                'You are not permitted to view this conversation',
            );
        }

        const { skip, take, search } = query;

        const andWhereConditions: Prisma.Enumerable<Prisma.MessageWhereInput> = [
            {
                conversationId: id,
            },
        ];

        if (search) {
            andWhereConditions.push({
                content: searchByMode(search),
            });
        }

        const [messages, total] = await Promise.all([
            this.dbContext.message.findMany({
                where: {
                    AND: andWhereConditions,
                },
                skip,
                take,
                select: {
                    id: true,
                    content: true,
                    type: true,
                    createdAt: true,
                    updatedAt: true,
                    author: {
                        select: {
                            userId: true,
                            displayName: true,
                            user: selectUser,
                        },
                    },
                    conversation: {
                        select: {
                            id: true,
                            displayName: true,
                            users: {
                                select: {
                                    userId: true,
                                    lastReadMessageId: true,
                                    displayName: true,
                                    user: selectUser,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: Prisma.SortOrder.desc,
                },
            }),
            this.dbContext.message.count({
                where: {
                    AND: andWhereConditions,
                },
            }),
        ]);

        const mappedMessages = messages.map((m) => ({
            ...omit(m, 'conversation'),
            isRead: m.conversation.users.some(
                (readUser) =>
                    readUser.userId === user.id && readUser.lastReadMessageId === m.id,
            ),
            author: {
                ...m.author.user,
                displayName: getAuthorDisplayName(m.author),
            },
        }));

        return Pagination.of({ skip, take }, total, mappedMessages);
    }

    async readMessage(messageId: string, conversationId: string, userId: string) {
        await this.dbContext.userToConversation.update({
            where: {
                conversationId_userId: {
                    conversationId,
                    userId,
                },
            },
            data: {
                lastReadMessageId: messageId,
            },
        });
    }
}