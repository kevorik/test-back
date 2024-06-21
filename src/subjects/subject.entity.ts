import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';

@Entity('subject') 
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Teacher, teacher => teacher.subjects, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  teachers: Teacher[];
}