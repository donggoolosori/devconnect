import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProfileModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
    }),
    PostModule,
  ],
})
export class AppModule {}
