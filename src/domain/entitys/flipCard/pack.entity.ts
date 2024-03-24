import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { User } from '../user/user.entity';
import { FlipCard } from './flip-card.entity';

@Entity({ name: 'packs' })
export class Pack extends AbstractEntity<Pack> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  public: boolean;

  @ManyToOne(() => User, (user) => user.packs)
  onwer: string;

  @ManyToMany(() => FlipCard)
  @JoinTable()
  flipCards: FlipCard[];
}
