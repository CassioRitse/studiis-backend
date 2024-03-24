import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from 'src/domain/dtos/create-quiz.dto';
import { Category, SubCategory, User } from 'src/domain/entitys';
import { Quiz } from 'src/domain/entitys/quiz/quiz.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateQuizUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(createQuizDto: CreateQuizDto) {
    const owner = await this.entityManager.findOne(User, {
      where: { id: createQuizDto.owner },
    });

    const category = await this.entityManager.findOne(Category, {
      where: { id: createQuizDto.category },
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    if (createQuizDto.subCategory) {
      const subCategory = await this.entityManager.findOne(SubCategory, {
        where: { id: createQuizDto.category },
      });

      if (!subCategory) {
        throw new HttpException('Sub Category not found', HttpStatus.NOT_FOUND);
      }

      return this.entityManager.save(
        Quiz,
        new Quiz({
          title: createQuizDto.title,
          owner: owner,
          category: category,
          subCategories: [subCategory],
        }),
      );
    }

    return this.entityManager.save(
      Quiz,
      new Quiz({
        title: createQuizDto.title,
        owner: owner,
        category: category,
      }),
    );
  }
}
