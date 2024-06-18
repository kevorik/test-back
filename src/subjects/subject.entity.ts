import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';

@Entity('subject') 
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Teacher, teacher => teacher.subjects)
  teachers: Teacher[];
}