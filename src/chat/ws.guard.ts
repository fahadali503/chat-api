import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const client = context.switchToWs().getClient<Socket>();
        const token = this.extractTokenFromHeader(client);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            client['auth-user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(client: Socket): string | undefined {

        const [type, token] = client.handshake.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
