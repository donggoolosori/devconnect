import { Document } from 'mongoose';
import { User } from 'src/users/schema/User.schema';
import { Education } from './education.interface';
import { Experience } from './experience.interface';
import { Social } from './social.interface';

export interface Profile extends Document {
  readonly user: User;
  readonly company: string;
  readonly website: string;
  readonly location: string;
  readonly status: string;
  readonly skills: string[];
  readonly bio: string;
  readonly githubusername: string;
  readonly experience: Experience[];
  readonly education: Education[];
  readonly social: Social;
}
