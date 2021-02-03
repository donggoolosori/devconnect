import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schema/User.schema';
import { Experience } from '../interfaces/experience.interface';
import { Education } from '../interfaces/education.interface';
import { Social } from '../interfaces/social.interface';

export type ProfileDocument = Profile & Document;

export class Profile {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  company: string;

  @Prop()
  website: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  skills: string[];

  @Prop()
  bio: string;

  @Prop()
  githubusername: string;

  @Prop()
  experience: Experience[];

  @Prop()
  education: Education[];

  @Prop()
  social: Social;

  @Prop({ default: Date.now })
  date: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
