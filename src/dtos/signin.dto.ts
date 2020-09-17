import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}