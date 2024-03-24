import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../abstract-entity.entity';
import { Status } from '../../status.enum';

@Entity({ name: 'flip_cards' })
export class FlipCard extends AbstractEntity<FlipCard> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  frontText: string;

  @Column()
  backText: string;

  @Column({ default: Status.LEARNED })
  status: Status;
}
