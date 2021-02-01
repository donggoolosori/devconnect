import { IsEmail, IsNotEmpty, IS_LENGTH, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @MinLength(6)
  readonly password: string;
}
