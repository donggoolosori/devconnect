import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schema/User.schema';
import { CreateCommentDto } from './dto/create-commnet.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Comment } from './interfaces/comment.interface';
import { Like } from './interfaces/like.interface';
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

  async likePost(post_id: string, user_id: any): Promise<Like[]> {
    try {
      const post = await this.postModel.findById(post_id);
      // Check post existence
      if (!post) {
        throw 'notfound';
      }
      // Check if the post has already been liked
      if (post.likes.some((like) => like.user.toString() === user_id)) {
        throw 'alreadyLiked';
      }
      post.likes.unshift({ user: user_id });

      await post.save();

      return post.likes;
    } catch (err) {
      if (err === 'alreadyLiked') {
        throw new BadRequestException('Post is already liked');
      }
      if (err.kind === 'ObjectId' || err === 'notfound') {
        throw new NotFoundException('Post not found');
      }
    }
  }

  async unlikePost(post_id: string, user_id: any): Promise<Like[]> {
    try {
      const post = await this.postModel.findById(post_id);
      // Check post existence
      if (!post) {
        throw 'notfound';
      }
      // Check if the post has already been unliked
      if (post.likes.every((like) => like.user.toString() !== user_id)) {
        throw 'NotLiked';
      }
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== user_id,
      );

      await post.save();

      return post.likes;
    } catch (err) {
      if (err === 'NotLiked') {
        throw new BadRequestException('Post is already unliked');
      }
      if (err.kind === 'ObjectId' || err === 'notfound') {
        throw new NotFoundException('Post not found');
      }
    }
  }

  async commentOnPost(
    user_id: User,
    post_id: string,
    createCommentDto: CreateCommentDto,
  ) {
    const { text } = createCommentDto;
    const user = await this.userModel.findById(user_id);
    try {
      const post = await this.postModel.findById(post_id);
      if (!post) {
        throw 'notfound';
      }
      const comment = {
        user: user_id,
        name: user.name,
        text,
        avatar: user.avatar,
      };

      post.comments.unshift(comment);

      await post.save();
      return post.comments;
    } catch (err) {
      if (err.kind === 'ObjectId' || err === 'notfound') {
        throw new NotFoundException('Post not found');
      }
    }
  }

  async deleteComment(post_id: string, comment_id: string, user_id: string) {
    try {
      // find post
      const post = await this.postModel.findById(post_id);
      if (!post) {
        throw 'PostNotFound';
      }

      // find comment
      const comment = post.comments.find(
        (comment) => comment.id === comment_id,
      );
      if (!comment) {
        throw 'CommentNotFound';
      }

      // Check User
      if (comment.user.toString() !== user_id) {
        throw 'UnAuth';
      }
      // delete comment
      post.comments = post.comments.filter(
        (comment) => comment.id !== comment_id,
      );

      await post.save();

      return post.comments;
    } catch (err) {
      if (err.kind === 'ObjectId' || err === 'PostNotFound') {
        throw new NotFoundException('Post not found');
      }
      if (err === 'CommentNotFound') {
        throw new NotFoundException('Comment not found');
      }
      if (err === 'UnAuth') {
        throw new UnauthorizedException();
      }
    }
  }
}
