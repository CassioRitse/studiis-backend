import { Module } from '@nestjs/common';
import { QuestionUseCaseModule } from 'src/app/usecases/question/question-use-case.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [QuestionUseCaseModule],
  controllers: [QuestionController],
})
export class QuestionControllerModule {}
