import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ResponseQuizUseCase } from 'src/app/usecases/quiz/private/response-quiz.use-case';
import { CreateQuizUseCase } from 'src/app/usecases/quiz/private/create-quiz.use-case';
import { FindAllPublicQuizzesUseCase } from 'src/app/usecases/quiz/public/find-all-public-quizzes.use-case';
import { FindOneQuizUseCase } from 'src/app/usecases/quiz/private/find-one-quiz.use-case';
import { CreateQuizDto } from 'src/domain/dtos/create-quiz.dto';
import { ResponseQuizDto } from 'src/domain/dtos/response-quiz.dto';
import { Public } from 'src/libs/metadata';
import { CreateCategoryDto } from 'src/domain/dtos/create-category.dto';
import { CreateCategoryUseCase } from 'src/app/usecases/quiz/private/create-category.use-case';
import { FindOneCategoryUseCase } from 'src/app/usecases/quiz/public/find-one-category.use-case';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly findAllPublicQuizzesUseCase: FindAllPublicQuizzesUseCase,
    private readonly findOneQuizUseCase: FindOneQuizUseCase,
    private readonly createQuizUseCase: CreateQuizUseCase,
    private readonly responseQuizUseCase: ResponseQuizUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly findOneCategoryUseCase: FindOneCategoryUseCase,
  ) {}

  @Public()
  @Post()
  async createQuiz(@Body() body: CreateQuizDto) {
    console.log(body);
    return this.createQuizUseCase.execute(body);
  }

  @Post('/answer')
  async responseQuiz(@Body() body: ResponseQuizDto, @Req() req) {
    return this.responseQuizUseCase.execute(body, req.user.id);
  }

  @Public()
  @Get('/category')
  async getCategory(@Param('id') id: string) {
    return this.findOneCategoryUseCase.execute(id);
  }

  @Public()
  @Post('/category')
  async newCategory(@Body() body: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(body);
  }

  @Public()
  @Get()
  async findAll() {
    return this.findAllPublicQuizzesUseCase.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.findOneQuizUseCase.execute(id, req.user.id);
  }
}
