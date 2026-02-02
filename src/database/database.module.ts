import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Course } from 'src/courses/entities/courses.entity';
import { DataSourceOptions } from 'typeorm';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'devtraining',
  entities: [Course, Tag], //Define as entidades que o TypeOrm deve gerenciar
  synchronize: true,
};

//Pega tudo que foi definido acima, e passa para o modulo do TypeOrm 
@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async() => {
      return {
        ...dataSourceOptions,
      }
    }
  })],
})

export class DatabaseModule {}
