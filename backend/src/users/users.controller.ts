import { Body, Controller, Post, Response } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user.dto';
import { Jwt } from 'src/interfaces/jwt.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<String> {
    return this.userService.registerUser(createUserDto);
  }
}
