import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-commnet.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Like } from './interfaces/like.interface';
import { PostDocument } from './interfaces/post.interface';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @route    POST a post
  // @desc     Create a post
  // @access   Private
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.createPost(createPostDto, req.user.id);
  }

  // @route    GET post
  // @desc     Get all posts
  // @access   Private
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllPosts(): Promise<PostDocument[]> {
    return this.postService.getAllPosts();
  }

  // @route    GET post/:id
  // @desc     Get a post by post ID
  // @access   Private
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getPostById(@Param('id') id: string): Promise<PostDocument> {
    return this.postService.getPostById(id);
  }

  // @route    DELETE post
  // @desc     Delete a post
  // @access   Private
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string, @Request() req): Promise<any> {
    return this.postService.deletePost(id, req.user.id);
  }

  // @route    PUT post/like/:id
  // @desc     Like a post
  // @access   Private
  @Put('/like/:post_id')
  @UseGuards(JwtAuthGuard)
  likePost(@Param('post_id') post_id: string, @Request() req): Promise<Like[]> {
    return this.postService.likePost(post_id, req.user.id);
  }

  // @route    PUT post/unlike/:id
  // @desc     UnLike a post
  // @access   Private
  @Put('/unlike/:post_id')
  @UseGuards(JwtAuthGuard)
  unlikePost(
    @Param('post_id') post_id: string,
    @Request() req,
  ): Promise<Like[]> {
    return this.postService.unlikePost(post_id, req.user.id);
  }

  // @route    PUT post/comment/:post_id
  // @desc     Comment on a post
  // @access   Private
  @Put('/comment/:post_id')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  commentOnPost(
    @Param('post_id') post_id: string,
    @Body() createCommentDto: CreateCommentDto,
    @Request() req,
  ) {
    return this.postService.commentOnPost(
      req.user.id,
      post_id,
      createCommentDto,
    );
  }
}
