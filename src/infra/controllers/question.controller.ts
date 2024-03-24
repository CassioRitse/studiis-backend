import { Body, Controller, Post } from '@nestjs/common';
import { CreateQuestionUseCase } from 'src/app/usecases/question/private/create-question.use-case';
import { ResponseQuestionUseCase } from 'src/app/usecases/question/public/response-question.use-case';
import { CreateQuestionDto } from 'src/domain/dtos/create-question.dto';
import { QuestionResponseDto } from 'src/domain/dtos/response-quiz.dto';
import { Public } from 'src/libs/metadata';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly createQuestionUseCase: CreateQuestionUseCase,
    private readonly responseQuestionUseCase: ResponseQuestionUseCase,
  ) {}

  @Public()
  @Post()
  async createQuiz(@Body() body: CreateQuestionDto) {
    return this.createQuestionUseCase.execute(body);
  }

  @Public()
  @Post('/response')
  async responseQuestion(@Body() body: QuestionResponseDto) {
    return this.responseQuestionUseCase.execute(body);
  }
}
