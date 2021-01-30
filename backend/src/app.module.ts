import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config/keys';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(config.mongoDB)],
  controllers: [],
  providers: [],
})
export class AppModule {}
