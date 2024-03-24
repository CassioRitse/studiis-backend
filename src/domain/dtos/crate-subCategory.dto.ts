import { IsNotEmpty } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  categoryId: string;
}
