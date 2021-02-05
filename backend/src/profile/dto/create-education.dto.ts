import { IsNotEmpty } from 'class-validator';

export class CreateEducationDto {
  _id: any;

  @IsNotEmpty()
  school: string;

  @IsNotEmpty()
  degree: string;

  @IsNotEmpty()
  fieldofstudy: string;

  @IsNotEmpty()
  from: Date;

  to: Date;

  current: boolean;

  description: string;
}
