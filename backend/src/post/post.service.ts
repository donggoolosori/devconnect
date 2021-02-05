import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/User.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Post') private postModel: Model<Post>,
  ) {}

  async createPost(createPostDto: CreatePostDto, user_id: User) {
    const { text } = createPostDto;
    const user = await this.userModel.findById(user_id).select('-password');

    const newPost = new this.postModel({
      text,
      name: user.name,
      avatar: user.avatar,
      user: user_id,
    });
    return newPost.save();
  }
}
