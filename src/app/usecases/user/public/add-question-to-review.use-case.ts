import { Injectable } from '@nestjs/common';
import { Question, Quiz } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';

@Injectable()
export class AddQuestionToReviewUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(questionId: string, userId: string) {
    const personalQuizReview = await this.entityManager.findOne(Quiz, {
      where: {
        owner: {
          id: userId,
        },
        category: {
          id: 'fa0e6806-7b89-4b65-9668-50d7f5fe2d15', // Personal Review Quiz
        },
      },
      relations: {
        questions: true,
      },
    });

    const question = await this.entityManager.findOne(Question, {
      where: {
        id: questionId,
      },
    });

    personalQuizReview.questions.push(question);

    await this.entityManager.save(Quiz, personalQuizReview);
    return personalQuizReview;
  }
}
