import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/domain/dtos/create-category.dto';
import { Category } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(params: CreateCategoryDto) {
    const newCategory = await this.entityManager.save(Category, {
      name: params.name,
    });

    return newCategory;
  }
}
