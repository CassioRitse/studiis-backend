import { Category } from 'src/domain/entitys';
import { EntityManager } from 'typeorm';

export class FindOneCategoryUseCase {
  constructor(private readonly entityManager: EntityManager) {}

  async execute(id: string) {
    const category = await this.entityManager.findOne(Category, {
      where: {
        id,
      },
    });

    return category;
  }
}
