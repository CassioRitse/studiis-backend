import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseQuizDto } from 'src/domain/dtos/response-quiz.dto';
import { History, Quiz, User } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';

@Injectable()
export class ResponseQuizUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(responseQuizDto: ResponseQuizDto, userId: string) {
    const quizQuestions = await this.entityManager.findOne(Quiz, {
      where: { id: responseQuizDto.quizId },
      relations: ['questions', 'questions.correctAnswer'],
      select: ['questions'],
    });

    if (!quizQuestions) {
      throw new HttpException('Quiz not found', HttpStatus.BAD_REQUEST);
    }

    const currentUser = await this.entityManager.findOne(User, {
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    // Inicializa a quantidade de respostas corretas
    let correctAnswers = 0;

    // Itera sobre as perguntas do quiz
    for (const question of quizQuestions.questions) {
      // Encontra a resposta correta para a pergunta
      const correctAnswer = question.correctAnswer;

      // Encontra a resposta fornecida pelo usuário
      const userAnswer = responseQuizDto.responses.find(
        (reponse) => reponse.questionId === question.id,
      );

      // Verifica se a resposta fornecida pelo usuário é correta
      if (userAnswer && userAnswer.answerId === correctAnswer.id) {
        correctAnswers++;
      }
    }
    const existHistory = await this.entityManager.findOne(History, {
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (existHistory) {
      existHistory.score = correctAnswers;
      await this.entityManager.save(History, existHistory);
    } else {
      const history = new History();
      history.quiz = quizQuestions;
      history.user = currentUser;
      history.score = correctAnswers;
      await this.entityManager.save(History, history);
    }

    return {
      quizId: quizQuestions.id,
      numQuestions: quizQuestions.questions.length,
      score: correctAnswers,
    };
  }
}
