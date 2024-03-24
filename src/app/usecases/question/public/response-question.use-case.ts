import { Injectable } from '@nestjs/common';
import { QuestionResponseDto } from 'src/domain/dtos/response-quiz.dto';
import { Question } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';

@Injectable()
export class ResponseQuestionUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(questionResponseDto: QuestionResponseDto) {
    const question = await this.entityManager.findOne(Question, {
      where: { id: questionResponseDto.questionId },
      relations: ['correctAnswer'],
      select: {
        id: true,
        explanation: true,
        correctAnswer: {
          id: true,
          description: true,
        },
      },
    });

    if (!question) {
      throw new Error('Question not found');
    }

    if (question.correctAnswer.id == questionResponseDto.answerId) {
      return { correctAnswer: question.correctAnswer, correct: true };
    }

    return {
      explanation: question.explanation,
      correctAnswer: question.correctAnswer,
      correct: false,
    };
  }
}
