import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Answer,
  FlipCard,
  Pack,
  Question,
  Quiz,
  User,
  History,
  Category,
  SubCategory,
} from 'src/domain/entitys';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'studiis',
      //   entities: [join(__dirname, '**', '.entity.{ts,js}')],
      entities: [
        Answer,
        FlipCard,
        Pack,
        Question,
        Quiz,
        User,
        History,
        Category,
        SubCategory,
      ],
      synchronize: true,
    }),
  ],
})
export class StudiisDatabaseModuel {}
