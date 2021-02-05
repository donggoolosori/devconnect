import { Document } from 'mongoose';
import { User } from 'src/users/schema/User.schema';

export interface Post extends Document {
  readonly user: User;
  text: string;
  readonly name: string;
  readonly avatar: string;
  likes: any;
  comments: Comment[];
  readonly date: Date;
}
