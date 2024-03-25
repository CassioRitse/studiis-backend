import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
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
      }),
      inject: [ConfigService],
    }),
  ],
})
export class StudiisDatabaseModuel {}
