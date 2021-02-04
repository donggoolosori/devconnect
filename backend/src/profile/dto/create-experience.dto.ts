import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateExperienceDto {
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
