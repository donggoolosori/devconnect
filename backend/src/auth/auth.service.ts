import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Jwt } from 'src/users/interfaces/jwt.interface';
import { User, UserDocument } from 'src/users/schema/User.schema';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserInfo(id: string): Promise<any> {
    return await this.userModel.findById(id).select('-password');
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    let user = await this.userModel.findOne({ email });

    // check user existence
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // check email, password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // return jwt
    const payload = {
      user: {
        id: user.id,
      },
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
