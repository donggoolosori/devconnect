import { Document } from 'mongoose';
import { User } from 'src/users/schema/User.schema';
import { Like } from './like.interface';

export interface PostDocument extends Document {
  readonly user: User;
  text: string;
  readonly name: string;
  readonly avatar: string;
  likes: Like[];
  comments: Comment[];
  readonly date: Date;
}
