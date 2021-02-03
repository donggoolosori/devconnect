import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schema/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;

    // check if user already exists
    let user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    // bring avatar by gravatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    // make user
    user = new this.userModel({
      name,
      email,
      password,
      avatar,
    });
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    return await user.save();
  }
}
