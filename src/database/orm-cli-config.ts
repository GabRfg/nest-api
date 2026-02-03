import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";
import { CreateCoursesTable1770139861229 } from "src/migrations/1770139861229-CreateCoursesTable";
import { CreateTagsTable1770142304365 } from "src/migrations/1770142304365-CreateTagsTable";
import { CreateCoursesTagsTable1770143960590 } from "src/migrations/1770143960590-CreateCoursesTagsTable"
import { AddCoursesIdToCoursesTagsTable1770145880247 } from "src/migrations/1770145880247-AddCoursesIdToCoursesTagsTable";
import { AddTagsCoursesTagsTable1770146988254 } from "src/migrations/1770146988254-AddTagsCoursesTagsTable";

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