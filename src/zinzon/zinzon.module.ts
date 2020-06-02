import { Module } from '@nestjs/common';
import { ZinzonService } from './zinzon.service';
import { ZinzonController } from './zinzon.controller';

@Module({
  controllers: [ZinzonController],
  providers: [ZinzonService],
})
export class ZinzonModule {}
