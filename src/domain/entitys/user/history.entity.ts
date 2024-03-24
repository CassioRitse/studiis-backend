import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Quiz } from '../quiz/quiz.entity';

@Entity({ name: 'histories' })
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.completedQuizzes)
  user: User;

  @ManyToOne(() => Quiz, (quiz) => quiz.responseHistory)
  quiz: Quiz;
}
