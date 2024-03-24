import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { Answer } from './answer.entity';
import { Quiz } from './quiz.entity';

@Entity({ name: 'questions' })
export class Question extends AbstractEntity<Question> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  tip: string;

  @Column({ nullable: true })
  explanation: string;

  @Column({ nullable: true })
  origin: string;

  @OneToMany(() => Answer, (answer) => answer.question, {
    eager: true,
  })
  @JoinColumn()
  answers: Answer[];

  @ManyToMany(() => Quiz, (quizzes) => quizzes.questions, { cascade: true })
  @JoinTable()
  quizzes: Quiz[];

  @OneToOne(() => Answer, { cascade: true })
  @JoinColumn()
  correctAnswer: Answer;

  @BeforeInsert()
  initializeQuestions() {
    this.answers = [];
    this.quizzes = [];
  }
}
