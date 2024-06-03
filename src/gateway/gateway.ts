import {
    Logger,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { isEmpty, omit } from 'lodash';
import { Server } from 'socket.io';
import { GatewaySessionManager } from './gateway.session';
import { WebsocketExceptionsFilter } from 'src/filters/web-socket.filter';
import { WsJwtGuard } from 'src/guard/ws.guard';
import { ConversationService } from 'src/modules/conversation/conversation.service';
import { ReadMessageDto, UserDto } from './dto';
import { WSAuthMiddleware } from 'src/middleware';
import { MessageService } from 'src/modules/message/message.service';
import { AuthService } from 'src/modules/auth';
import { AuthenticatedSocket, UserResponse } from 'src/common';
import { UUIDParam } from 'src/common/types/uuid-param';
import { GetConversationPayload, GetMessageResponse } from 'src/modules/conversation/interface/get-conversation.payload';
import { MessageEvent } from './enum';
import { getAuthorDisplayName, getConversationDisplayName, getOtherUserAvatar } from 'src/modules/conversation/utils/name';
// import { FriendsService } from '@modules/friends';

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    transports: ['websocket'],
})
@UseFilters(WebsocketExceptionsFilter)
@UsePipes(
    new ValidationPipe({
        transform: true,
        whitelist: true,
    }),
)
@UseGuards(WsJwtGuard)
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(EventGateway.name);
    constructor(
        private readonly messageService: MessageService,
        private readonly sessions: GatewaySessionManager,
        private readonly authService: AuthService,
        // private readonly friendService: FriendsService,
        private readonly conversationService: ConversationService,
    ) { }
    async handleConnection(client: AuthenticatedSocket) {
        // const friends = (await this.friendService.getFriendList(
        //     client.user.id,
        // )) as UserDto[];
        // if (this.sessions.getSocketsByUserId(client.user.id).length === 0) {
        //     const onlineFriendSockets = this.getOnlineUsers(friends);
        //     onlineFriendSockets.forEach((socket) => {
        //         socket.emit('onFriendOnline', omit(client.user, 'roles', 'iat', 'exp'));
        //     });
        // }
        this.sessions.setUserSocket(this.getSessionId(client), client);
    }

    getOnlineUsers(users: UserDto[]) {
        const userSockets = users
            .map((user) => this.sessions.getSocketsByUserId(user.id))
            .filter((sockets) => sockets.length > 0);
        return userSockets.flat();
    }

    async handleDisconnect(client: AuthenticatedSocket) {
        this.sessions.removeUserSocket(this.getSessionId(client));
        // const friends = (await this.friendService.getFriendList(
        //     client.user.id,
        // )) as UserDto[];
        // if (this.sessions.getSocketsByUserId(client.user.id).length === 0) {
        //     const onlineFriendSockets = this.getOnlineUsers(friends);
        //     onlineFriendSockets.forEach((socket) => {
        //         socket.emit(
        //             'onFriendOffline',
        //             omit(client.user, 'roles', 'iat', 'exp'),
        //         );
        //     });
        // }
    }

    getSessionId({ user }: AuthenticatedSocket) {
        return `${user.id}_${user.session}`;
    }

    @WebSocketServer() server: Server;

    afterInit(server: Server) {
        const middle = WSAuthMiddleware(this.authService);
        server.use(middle);
        this.logger.log(`WS ${EventGateway.name} init`);
    }

    @SubscribeMessage('onMessage')
    async handleMessage(@ConnectedSocket() client: AuthenticatedSocket) {
        console.log(client.user);
    }

    @SubscribeMessage('onGetOnlineFriends')
    // async handleGetOnlineFriends(@ConnectedSocket() client: AuthenticatedSocket) {
    //     const friends = (await this.friendService.getFriendList(
    //         client.user.id,
    //     )) as UserDto[];
    //     const onlineFriends = [];
    //     friends.forEach((friend) => {
    //         const sockets = this.sessions.getSocketsByUserId(friend.id);
    //         if (sockets.length > 0) {
    //             onlineFriends.push(friend);
    //         }
    //     });
    //     client.emit('onGetOnlineFriends', onlineFriends);
    // }

    @SubscribeMessage('onConversationJoin')
    async handleJoinConversation(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() { id }: UUIDParam,
    ) {
        const socket = this.sessions.getUserSocket(this.getSessionId(client));
        this.logger.log(`${client.user.id} joined conversation ${id}`);
        socket.join(id);
    }

    @SubscribeMessage('onConversationLeave')
    async handleLeaveConversation(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() { id }: UUIDParam,
    ) {
        const socket = this.sessions.getUserSocket(this.getSessionId(client));
        socket.leave(id);
    }

    @SubscribeMessage('delMessage')
    async handleDeleteMessage(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() { id }: UUIDParam,
    ) {
        const message = await this.messageService.delete(client.user, id);
        this.server.emit('messageDeleted', message);
    }

    @SubscribeMessage('tag')
    handleTag(client: any, payload: any): string {
        return 'Hello go';
    }

    @SubscribeMessage('onReadMessage')
    async handleReadMessage(
        @ConnectedSocket() client: AuthenticatedSocket,
        @MessageBody() body: ReadMessageDto,
    ) {
        const { conversationId, messageId } = body;
        console.log(`${client.user.fullName} read a message ${messageId}`);
        return await this.conversationService.readMessage(
            messageId,
            conversationId,
            client.user.id,
        );
    }

    @OnEvent(MessageEvent.MESSAGE_CREATED)
    async handleMessageCreateEvent(payload: GetMessageResponse) {
        const { conversationId } = payload;
        this.logger.log(`Message in ${conversationId}`);
        const members = await this.conversationService.getMemberOfConversations(
            conversationId,
        );
        const users = members.map(({ user }) => user);
        const onlineUsers = this.getOnlineUsers(users);
        onlineUsers.forEach((socket) => {
            const mappedMessage = {
                ...payload,
                conversation: {
                    ...omit(payload.conversation, 'users'),
                    avatarUrl: getOtherUserAvatar(payload.conversation.users, socket.user),
                    displayName: getConversationDisplayName(
                        payload.conversation,
                        socket.user,
                    ),
                },
                author: {
                    ...payload.author.user,
                    displayName: getAuthorDisplayName(payload.author),
                },
            };
            socket.emit('onMessage', mappedMessage);
        });
    }

    @OnEvent(MessageEvent.CONVERSATION_JOINED)
    handleConversationJoinedEvent(payload: {
        users: UserResponse[];
        conversationId: string;
    }) {
        const { users, conversationId } = payload;
        this.server.to(conversationId).emit('onAddUsersConversation', users);
    }

    @OnEvent(MessageEvent.CONVERSATION_LEFT)
    handleLeft(payload: { user: UserResponse; conversationId: string }) {
        const { user, conversationId } = payload;
        this.server.to(conversationId).emit('onUserLeaveConversation', user);
    }

    @OnEvent(MessageEvent.CONVERSATION_CREATED)
    handleConversationCreateEvent(payload: GetConversationPayload) {
        const { users, id } = payload;
        users.forEach(({ userId }) => {
            const socket = this.sessions.getUserSocket(userId);
            if (socket) socket.join(id);
        });
    }

}