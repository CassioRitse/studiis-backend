import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { Quiz } from '../quiz/quiz.entity';
import { Pack } from '../flipCard/pack.entity';
import { History } from './history.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  contactNumber: string;

  @OneToMany(() => Quiz, (quiz) => quiz.owner)
  quizzes: Quiz[];

  @OneToMany(() => Pack, (pack) => pack.onwer)
  packs: Pack[];

  @OneToMany(() => History, (history) => history.user)
  @JoinTable()
  completedQuizzes: History[];
}
