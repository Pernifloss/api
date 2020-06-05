import { Socket } from 'socket.io';
import { ChatMessage } from './ChatMessage';

export class ChatClient {
  socket: Socket;
  userId: string;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  changeUserName(message: ChatMessage): void {
    if (!message) return;
    if (!message.userId) return;
    this.userId = message.userId;
  }
}