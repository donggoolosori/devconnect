import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @route    POST api/posts
  // @desc     Create a post
  // @access   Private
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.createPost(createPostDto, req.user.id);
  }
}
