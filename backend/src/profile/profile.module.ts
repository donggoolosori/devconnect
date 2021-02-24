import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/post/schema/Post.schema';
import { User, UserSchema } from 'src/users/schema/User.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileSchema } from './schema/Profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Profile', schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
