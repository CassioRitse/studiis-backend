import { Module } from '@nestjs/common';
import { AuthUseCaseModule } from 'src/app/usecases/auth/auth-use-case.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [AuthUseCaseModule],
  controllers: [AuthController],
})
export class AuthControllerModule {}
