import { Query, Resolver } from '@nestjs/graphql';
import { ZinzonService } from './zinzon.service';

@Resolver()
export class ZinzonResolver {
  constructor(private zinzonService: ZinzonService) {}

  @Query()
  async zinzon() {
    return this.zinzonService.zinzonne();
  }
}
