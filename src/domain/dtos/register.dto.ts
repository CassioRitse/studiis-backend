import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  contactNumber: string;
}
