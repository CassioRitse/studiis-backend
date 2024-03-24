import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ValidateTokenUseCase } from './validate-toke.use-case';
import { JwtService } from './jwt.service';
import { SignInUseCase } from './sign-in.use-case';
import { RegisterUseCase } from './register.use-case';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ValidateTokenUseCase, JwtService, SignInUseCase, RegisterUseCase],
  exports: [ValidateTokenUseCase, JwtService, SignInUseCase, RegisterUseCase],
})
export class AuthUseCaseModule {}
