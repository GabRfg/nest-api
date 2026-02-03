import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1770050938267 } from "src/migrations/1770050938267-CreateCoursesTable";
import { CreateTagsTable1770053241235 } from "src/migrations/1770053241235-CreateTagsTable";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false, //manter false PLEASE
  migrations: [CreateCoursesTable1770050938267, CreateTagsTable1770053241235], //pega o que esta no arquivo, propriedades de conexão, e aplicar ao database
});