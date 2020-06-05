import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get()
  getUsers(): Record<string, string>[] {
    return this.chatService.getUsers().map(u => ({ socketId: u.socket.id, userName: u.userId }));
  }
}