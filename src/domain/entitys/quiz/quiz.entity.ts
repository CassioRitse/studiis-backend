import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { User } from '../user/user.entity';
import { Question } from './question.entity';
import { History } from '../user/history.entity';
import { Category } from './category.entity';
import { SubCategory } from './subCategory.entity';

@Entity({ name: 'quizzes' })
export class Quiz extends AbstractEntity<Quiz> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  public: boolean;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => User, (user) => user.quizzes)
  owner: User;

  @ManyToMany(() => Question, (question) => question.quizzes)
  questions: Question[];

  @ManyToOne(() => Category, (category) => category.quizzes)
  @JoinTable()
  category: Category;

  @ManyToMany(() => SubCategory)
  @JoinTable()
  subCategories: SubCategory[];

  @OneToMany(() => History, (history) => history.quiz)
  @JoinTable()
  responseHistory: History[];

  @BeforeInsert()
  initializeQuestions() {
    this.questions = [];
    this.responseHistory = [];
  }
}
