import { IsNotEmpty, IsOptional } from 'class-validator';
import { Education } from '../interfaces/education.interface';
import { Experience } from '../interfaces/experience.interface';
import { Social } from '../interfaces/social.interface';

export class CreateProfileDto {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  skills: string;

  @IsOptional()
  company: string;

  @IsOptional()
  website: string;

  @IsOptional()
  location: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  githubusername: string;

  @IsOptional()
  facebook: string;

  @IsOptional()
  twitter: string;

  @IsOptional()
  instagram: string;

  @IsOptional()
  youtube: string;

  @IsOptional()
  linkedin: string;

  @IsOptional()
  experience: Experience[];

  @IsOptional()
  education: Education[];

  @IsOptional()
  social: Social;

  date: Date;
}
