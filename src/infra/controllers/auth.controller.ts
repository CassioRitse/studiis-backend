import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUseCase } from 'src/app/usecases/auth/register.use-case';
import { SignInUseCase } from 'src/app/usecases/auth/sign-in.use-case';
import { RegisterDto } from 'src/domain/dtos/register.dto';

import { SignInDto } from 'src/domain/dtos/sign-in.dto';
import { Public } from 'src/libs/metadata';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SignInUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Public()
  @Post('/signin')
  async postSearch(@Body() body: SignInDto) {
    return this.signinUseCase.execute(body);
  }

  @Public()
  @Post('/register')
  async addReview(@Body() body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }
}
