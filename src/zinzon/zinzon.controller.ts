import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("zinzon")
  zinzonne(): string {
    return this.appService.zinzonne();
  }
}
