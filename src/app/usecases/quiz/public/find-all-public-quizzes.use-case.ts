import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';

@Injectable()
export class FindAllPublicQuizzesUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(): Promise<any[]> {
    const quizzes = await this.entityManager.find(Quiz, {
      where: { public: true },
      select: ['id', 'title', 'createdAt', 'updatedAt'],
      relations: ['owner', 'questions', 'category', 'subCategories'],
    });

    console.log(quizzes);

    // Mapeia os resultados para ajustar a estrutura do objeto de retorno
    const mappedQuizzes = quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      category: quiz.category.name,
      subCategories: quiz.subCategories.map((sc) => sc.name),
      numQuestions: quiz.questions.length,
      owner: {
        name: quiz.owner.name,
      },
    }));

    return mappedQuizzes;
  }
}
