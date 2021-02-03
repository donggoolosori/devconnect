import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
  registerUser(createUserDto: CreateUserDto): string {
    return 'Create User';
  }
}
