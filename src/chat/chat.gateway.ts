import {
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
import { ChatMessage } from './ChatMessage';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {
  }

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
    this.chatService.GetUser(client.id).ChangeUserName(new ChatMessage(payload));
  }

  afterInit(Server: Server): void {
    this.logger.log('Chat Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected from chat: ${client.id}`);
    const clientIndex = this.chatService.chatClients.findIndex(c => c.socket.id === client.id);
    if (clientIndex >= 0) this.chatService.chatClients.splice(clientIndex, 1);
  }

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected to chat: ${client.id}`);
    this.chatService.addClient(client);
  }
}