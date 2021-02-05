import { Document } from 'mongoose';
import { User } from 'src/users/schema/User.schema';
import { Education } from './education.interface';
import { Experience } from './experience.interface';
import { Social } from './social.interface';

export interface Profile extends Document {
  readonly user: User;
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string[];
  bio: string;
  githubusername: string;
  experience: Experience[];
  education: Education[];
  social: Social;
}
