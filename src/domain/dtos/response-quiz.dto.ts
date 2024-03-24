import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class QuestionResponseDto {
  @IsNotEmpty()
  questionId: string;

  @IsNotEmpty()
  answerId: string;
}

export class ResponseQuizDto {
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => QuestionResponseDto)
  responses: QuestionResponseDto[];
}
