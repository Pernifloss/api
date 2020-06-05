import { Injectable } from '@nestjs/common';
import { ChatClient } from './ChatClient';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  chatClients: ChatClient[] = [];

  getUsers(): ChatClient[] {
    return this.chatClients;
  }

  GetUser(id: string) : ChatClient {
    return this.chatClients.find(u => u.socket.id === id);
  }

  addClient(socket: Socket) : void {
    this.chatClients.push(new ChatClient(socket));
  }

  removeClient(client: Socket) : void {
    const clientIndex = this.chatClients.findIndex(c => c.socket.id === client.id);
    if (clientIndex >= 0) this.chatClients.splice(clientIndex, 1);
  }
}