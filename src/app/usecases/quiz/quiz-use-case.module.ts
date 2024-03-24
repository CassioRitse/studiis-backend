import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';
import { FindAllPublicQuizzesUseCase } from './public/find-all-public-quizzes.use-case';
import { CreateQuizUseCase } from './private/create-quiz.use-case';
import { FindOneQuizUseCase } from './private/find-one-quiz.use-case';
import { ResponseQuizUseCase } from './private/response-quiz.use-case';
import { FindOneCategoryUseCase } from './public/find-one-category.use-case';
import { CreateCategoryUseCase } from './private/create-category.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  providers: [
    FindAllPublicQuizzesUseCase,
    CreateQuizUseCase,
    FindOneQuizUseCase,
    ResponseQuizUseCase,
    FindOneCategoryUseCase,
    CreateCategoryUseCase,
  ],
  exports: [
    FindAllPublicQuizzesUseCase,
    CreateQuizUseCase,
    FindOneQuizUseCase,
    ResponseQuizUseCase,
    FindOneCategoryUseCase,
    CreateCategoryUseCase,
  ],
})
export class QuizUseCaseModule {}
