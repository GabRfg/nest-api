import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false, //manter false PLEASE
  migrations: [
  ], //pega o que esta no arquivo, propriedades de conexão, e aplicar ao database
});