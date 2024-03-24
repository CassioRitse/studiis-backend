import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';
import { CreateQuestionUseCase } from './private/create-question.use-case';
import { ResponseQuestionUseCase } from './public/response-question.use-case';
import { Question } from 'src/domain/entitys';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  providers: [CreateQuestionUseCase, ResponseQuestionUseCase],
  exports: [CreateQuestionUseCase, ResponseQuestionUseCase],
})
export class QuestionUseCaseModule {}
