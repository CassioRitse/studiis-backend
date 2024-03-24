import { Controller, Param, Post, Req } from '@nestjs/common';
import { AddQuestionToReviewUseCase } from 'src/app/usecases/user/public/add-question-to-review.use-case';

@Controller()
export class UserControlle {
  constructor(
    private readonly addQuestionToReviewUseCase: AddQuestionToReviewUseCase,
  ) {}

  @Post('/review/:questionId')
  async addReview(@Param() { questionId }: { questionId: string }, @Req() req) {
    return this.addQuestionToReviewUseCase.execute(questionId, req.user.id);
  }
}
