import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsUserDecorator } from './ws-user.decorator';
import { JwtPayload } from 'src/users/constants';
import { WsGuard } from './ws.guard';
import { UseGuards } from '@nestjs/common'
import { MessageService } from './message.service';

@UseGuards(WsGuard)
@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server

  constructor(private messageService: MessageService) { }


  @SubscribeMessage('joinChat')
  handleJoin(@MessageBody() chatId: string, @ConnectedSocket() client: Socket) {
    console.log("Chat Id", chatId);
    client.join(chatId);
    client.emit("joinChat", "successfully joined the room")
  }

  @SubscribeMessage("message")
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() body: { chatId: string, content: string }, @WsUserDecorator() user: JwtPayload) {
    let message = await this.messageService.createTextMessage(body.chatId, user.id, body.content);
    message = await message.populate('sender');
    client.emit('message', message);
  }


  @SubscribeMessage('test')
  handleTest(client: Socket, payload: any, @WsUserDecorator() user: JwtPayload): string {
    return user.email;
  }
}
