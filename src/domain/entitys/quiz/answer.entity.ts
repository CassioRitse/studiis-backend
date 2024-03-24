import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { Question } from './question.entity';

@Entity({ name: 'answers' })
export class Answer extends AbstractEntity<Answer> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
