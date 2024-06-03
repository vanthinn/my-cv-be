import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedSocket } from 'src/common';
import { AuthService } from 'src/modules/auth';

@Injectable()
export class WsJwtGuard implements CanActivate {
    private logger: Logger = new Logger(WsJwtGuard.name);

    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const client: AuthenticatedSocket = context
                .switchToWs()
                .getClient<AuthenticatedSocket>();
            const authToken =
                client.handshake?.auth?.token.split(' ')[1] ||
                client.handshake?.auth?.token;

            const user = await this.authService.verifyToken(authToken);
            return Boolean(user);
        } catch (err) {
            this.logger.error(err);
            throw new UnauthorizedException();
        }
    }
}