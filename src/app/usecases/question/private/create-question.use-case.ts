import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from 'src/domain/dtos/create-question.dto';
import { Answer } from 'src/domain/entitys';
import { Question } from 'src/domain/entitys/quiz/question.entity';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateQuestionUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await this.entityManager.transaction(async () => {
      const quiz = await this.entityManager.findOne(Quiz, {
        where: { id: createQuestionDto.quiz },
      });

      if (!quiz) {
        throw new NotFoundException('Quiz not found');
      }

      const newQuestion = await this.entityManager.save(Question, {
        title: createQuestionDto.title,
        tip: createQuestionDto.tip,
        quizzes: [quiz],
      });

      for (const answerDto of createQuestionDto.answers) {
        const newAnswer = this.entityManager.create(Answer, {
          description: answerDto.description,
          question: newQuestion,
        });

        if (answerDto.correct) {
          newQuestion.correctAnswer = newAnswer;
          await this.entityManager.save(Question, newQuestion);
        }

        await this.entityManager.save(Answer, newAnswer);
      }

      return newQuestion;
    });
  }
}
