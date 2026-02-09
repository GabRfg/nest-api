import 'dotenv/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { CreateCoursesTable1770139861229 } from "src/migrations/1770139861229-CreateCoursesTable";
import { CreateTagsTable1770142304365 } from "src/migrations/1770142304365-CreateTagsTable";
import { CreateCoursesTagsTable1770143960590 } from "src/migrations/1770143960590-CreateCoursesTagsTable"
import { AddCoursesIdToCoursesTagsTable1770145880247 } from "src/migrations/1770145880247-AddCoursesIdToCoursesTagsTable";
import { AddTagsCoursesTagsTable1770146988254 } from "src/migrations/1770146988254-AddTagsCoursesTagsTable";
import { Course } from "src/courses/entities/courses.entity";
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag], //Define as entidades que o TypeOrm deve gerenciar
  synchronize: false,  //prod não se usa, apenas em dev para criar as tabelas automaticamente
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false, //manter false PLEASE
  migrations: [
    CreateCoursesTable1770139861229,
    CreateTagsTable1770142304365,
    CreateCoursesTagsTable1770143960590,
    AddCoursesIdToCoursesTagsTable1770145880247,
    AddTagsCoursesTagsTable1770146988254
  ], //pega o que esta no arquivo, propriedades de conexão, e aplicar ao database
});
