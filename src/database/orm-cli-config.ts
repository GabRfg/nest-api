import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1770050938267 } from "src/migrations/1770050938267-CreateCoursesTable";
import { CreateTagsTable1770053241235 } from "src/migrations/1770053241235-CreateTagsTable";
import { CreateTagsTable1770131831963 } from "src/migrations/1770131831963-CreateTagsTable";
import { AddCoursesIdToCoursesTagsTable1770132522624 } from "src/migrations/1770132522624-AddCoursesIdToCoursesTagsTable";
import { AddTagsIdToCoursesTagsTable1770135036886 } from "src/migrations/1770135036886-AddTagsIdToCoursesTagsTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false, //manter false PLEASE
  migrations: [
    CreateCoursesTable1770050938267, 
    CreateTagsTable1770053241235,
    CreateTagsTable1770131831963,
    AddCoursesIdToCoursesTagsTable1770132522624,
    AddTagsIdToCoursesTagsTable1770135036886
  ], //pega o que esta no arquivo, propriedades de conexão, e aplicar ao database
});