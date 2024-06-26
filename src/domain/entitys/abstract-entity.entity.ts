import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity<T> {
  @CreateDateColumn({ name: 'created-at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: null })
  deletedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
