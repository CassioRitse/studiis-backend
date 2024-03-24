import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  correct: boolean;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  quiz: string;

  @IsOptional()
  tip: string;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
