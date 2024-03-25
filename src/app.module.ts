import { Module } from '@nestjs/common';
import { StudiisDatabaseModuel } from './infra/database/studiis-database.module';
import { QuizControllerModule } from './infra/controllers/quiz-controller.module';
import { QuestionControllerModule } from './infra/controllers/question-controller.module';
import { AllExceptionsFilter } from './libs/common/http-exception.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthControllerModule } from './infra/controllers/auth-controller.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthUseCaseModule } from './app/usecases/auth/auth-use-case.module';
import { UserControllerModule } from './infra/controllers/user-controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
      envFilePath: 'src/.env',
      isGlobal: true,
    }),
    StudiisDatabaseModuel,
    QuizControllerModule,
    QuestionControllerModule,
    AuthControllerModule,
    AuthUseCaseModule,
    UserControllerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [],
})
export class AppModule {}
