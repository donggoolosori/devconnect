import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExperienceDto {
  _id: any;
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  from: Date;

  @IsOptional()
  to: Date;

  @IsOptional()
  location: string;

  @IsOptional()
  current: boolean;

  @IsOptional()
  description: string;
}
