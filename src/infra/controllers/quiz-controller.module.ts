import { Module } from '@nestjs/common';
import { QuizUseCaseModule } from 'src/app/usecases/quiz/quiz-use-case.module';
import { QuizController } from './quiz.controller';

@Module({
  imports: [QuizUseCaseModule],
  controllers: [QuizController],
})
export class QuizControllerModule {}
