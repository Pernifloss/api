export class ChatMessage {
  userId: string;
  message: string;
  time: number;

  constructor(payload: any) {
    this.userId = payload.userId;
    this.message = payload.message;
    this.time = payload.time;
  }
}