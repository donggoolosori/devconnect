import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schema/user.schema';
import * as gravatar from 'gravatar';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/config/keys';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<String> {
    const { name, email, password } = createUserDto;

    // get avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const newUser = new this.userModel({ name, email, password, avatar });
    newUser.password = await bcrypt.hash(password, salt);

    try {
      await newUser.save();

      const payload = {
        user: {
          id: newUser.id,
        },
      };

      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 3600 },
        (err: Error, token: String) => {
          if (err) throw err;
          return { token };
        },
      );
    } catch (err) {
      console.error(err.message);
      return err;
    }
  }
}
