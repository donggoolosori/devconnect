import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/User.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostSchema } from './schema/Post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
