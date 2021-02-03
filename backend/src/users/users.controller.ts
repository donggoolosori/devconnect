import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Jwt } from './interfaces/jwt.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  registerUser(@Body() createUserDto: CreateUserDto): Promise<Jwt> {
    return this.usersService.registerUser(createUserDto);
  }
}
