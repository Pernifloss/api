import {
  ConnectedSocket, MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatMessage, IChatMessage } from './ChatMessage';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: IChatMessage,
  ): void {
    this.server.emit('msgToClient', payload);

    const message = new ChatMessage(payload);
    this.chatService.GetUser(client.id).changeUserName(message);
  }

  afterInit(Server: Server): void {
    this.logger.log('Chat Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected from chat: ${client.id}`);
    this.chatService.removeClient(client);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected to chat: ${client.id}`);
    this.chatService.addClient(client);
  }
}