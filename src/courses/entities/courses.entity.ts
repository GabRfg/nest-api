import { 
  Column,
  Entity, 
  JoinTable, 
  ManyToMany, 
  PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tags.entity";

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
}
