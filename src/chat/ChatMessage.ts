export interface IChatMessage {
  userId: string;
  message: string;
  time: number;
}

export class ChatMessage implements IChatMessage {
  userId: string;
  message: string;
  time: number;

  constructor(payload: IChatMessage) {
    this.userId = payload.userId;
    this.message = payload.message;
    this.time = payload.time;
  }
}