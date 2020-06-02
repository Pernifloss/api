import { Module } from '@nestjs/common';
import { ZinzonService } from './zinzon.service';
import { ZinzonController } from './zinzon.controller';
import { ZinzonResolver } from './zinzon.resolver';
import { ZinzonGateway } from './zinzon.gateway';

@Module({
  controllers: [ZinzonController],
  providers: [ZinzonService, ZinzonResolver, ZinzonGateway],
})
export class ZinzonModule {}
