import {
  IsEmail,
  IsJWT,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}

export class ValidateTokenDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string;
}
