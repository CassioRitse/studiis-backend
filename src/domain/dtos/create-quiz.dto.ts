import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  category: string;

  subCategory?: string;
}
