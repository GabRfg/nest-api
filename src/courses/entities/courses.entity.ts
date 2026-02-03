import { 
  Column,
  CreateDateColumn,
  Entity, 
  JoinTable, 
  ManyToMany, 
  PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";
import { BeforeInsert } from "typeorm/browser";
import { randomUUID } from "node:crypto";

@Entity('courses') 
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  description: string;

  //relacionamento muitos para muitos, entidades
  @JoinTable()
  @ManyToMany(() => Tag, tag => tag.courses, {
    cascade: true, //Qualquer dado que estiver na entidade relacionada, sera salvos/criados automaticamente
  })
  tags: Tag[];

  @CreateDateColumn({ type: 'timestamp'})
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return
    }
    this.id randomUUID
  }
}
