import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubCategory } from './subCategory.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quizzes: Quiz[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  @JoinTable()
  subCategories: SubCategory[];
}
