import { Module } from '@nestjs/common';
import { UserControlle } from './user.controller';
import { AddQuestionToReviewUseCase } from 'src/app/usecases/user/public/add-question-to-review.use-case';

@Module({
  controllers: [UserControlle],
  exports: [AddQuestionToReviewUseCase],
  providers: [AddQuestionToReviewUseCase],
})
export class UserControllerModule {}
