import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/User.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDocument } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Post') private postModel: Model<PostDocument>,
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

  async getAllPosts(): Promise<PostDocument[]> {
    const posts = await this.postModel.find().sort({ date: -1 });
    return posts;
  }

  async getPostById(id: string): Promise<PostDocument> {
    try {
      const post = await this.postModel.findById(id);
      if (!post) {
        throw 'notfound';
      }
      return post;
    } catch (error) {
      if (error.kind === 'ObjectId' || error === 'notfound') {
        throw new NotFoundException('Post not found');
      }
    }
  }

  async deletePost(id: string, user_id: string): Promise<any> {
    const post = await this.postModel.findById(id);

    // Check post existence
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    // Check User
    if (post.user.toString() !== user_id) {
      throw new UnauthorizedException();
    }
    // Remove post
    await post.remove();
    // Return message
    return { msg: 'Post Removed' };
  }
}
