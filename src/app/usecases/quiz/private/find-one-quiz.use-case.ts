import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';
import { History } from 'src/domain/entitys';

@Injectable()
export class FindOneQuizUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(id: string, userId: string): Promise<any> {
    const quiz = await this.entityManager.findOne(Quiz, {
      where: { id },
      select: [
        'id',
        'title',
        'createdAt',
        'updatedAt',
        'category',
        'subCategories',
        'questions',
      ],
      relations: [
        'questions',
        'questions.answers',
        'questions.correctAnswer',
        'category',
        'subCategories',
      ],
    });

    if (!quiz) {
      throw new NotFoundException('Quiz não existe');
    }

    const isQuizAlreadyDone = await this.entityManager.findOne(History, {
      where: {
        quiz: {
          id,
        },
        user: {
          id: userId,
        },
      },
    });

    // Objeto do quiz na estrutura correta
    const mappedQuiz = {
      id: quiz.id,
      title: quiz.title,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      category: quiz.category.name,
      subCategories: quiz.subCategories.map((sc) => sc.name),
      numQuestions: quiz.questions.length,
      alreadyDone: isQuizAlreadyDone && true,
      score: isQuizAlreadyDone && isQuizAlreadyDone.score,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        title: question.title,
        tip: question.tip,
        origin: question.origin,
        answers: question.answers.map((answer) => ({
          id: answer.id,
          description: answer.description,
        })),
      })),
    };

    return mappedQuiz; // Retorna um array com o objeto mapeado do quiz
  }
}
