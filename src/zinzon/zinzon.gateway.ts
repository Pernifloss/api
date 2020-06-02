import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ZinzonService } from './zinzon.service';
import Socket = NodeJS.Socket;

@WebSocketGateway()
export class ZinzonGateway {
  constructor(private zinzonService: ZinzonService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('zinzon')
  zinzon(@MessageBody() data, @ConnectedSocket() client: Socket) {
    client.emit('zinzonResponse', this.zinzonService.zinzonne());
  }
}
