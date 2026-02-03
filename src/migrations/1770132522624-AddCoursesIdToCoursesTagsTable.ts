import { Table } from "lucide-react";
import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

//nessa migration estamos adicionando coluna, e chaves estrangeiras a uma tabela existente 

export class AddCoursesIdToCoursesTagsTable1770132522624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('courses_tags', new TableColumn({
        name: 'courses_id',
        type: 'uuid',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey('courses_tags', new TableForeignKey({
      name: 'FK_Courses_Tags_Courses',
      columnNames: ['courses_id'],
      referencedTableName: 'courses',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    })
  )
}

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('courses_tags', 'FK_Courses_Tags_Courses');

      await queryRunner.dropColumn('courses_tags', 'courses_id');
    }
  }
