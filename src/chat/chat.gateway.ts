import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsUserDecorator } from './ws-user.decorator';
import { JwtPayload } from 'src/users/constants';
import { WsGuard } from './ws.guard';
import { UseGuards } from '@nestjs/common'

@UseGuards(WsGuard)
@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server


  @SubscribeMessage('joinChat')
  handleJoin(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    console.log("Chat Id", chatId);
    client.join(chatId);
    client.emit("joinChat", "successfully joined the room")
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any, @WsUserDecorator() user: JwtPayload): string {
    return 'Hello world!';
  }
}
