import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZinzonModule } from './zinzon/zinzon.module';
import { GraphQLModule } from '@nestjs/graphql';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./src/**/*.graphql'],
    }),
    ZinzonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
