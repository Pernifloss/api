import { Controller, Get } from '@nestjs/common';
import {ZinzonService} from "./zinzon.service";
import {IResult} from "./zinzon";

@Controller("zinzon")
export class ZinzonController {
  constructor(private readonly zinzonService: ZinzonService) {}

  @Get()
  zinzone():  IResult {
    return this.zinzonService.zinzonne();
  }
}
