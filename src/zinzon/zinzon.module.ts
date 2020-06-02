import { Module } from '@nestjs/common';
import { ZinzonService } from './zinzon.service';
import { ZinzonController } from './zinzon.controller';
import { ZinzonResolver } from './zinzon.resolver';

@Module({
  controllers: [ZinzonController],
  providers: [ZinzonService, ZinzonResolver],
})
export class ZinzonModule {}
