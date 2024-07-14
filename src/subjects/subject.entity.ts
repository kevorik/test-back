import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';

@Entity('subject') 
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  foundedDate: Date;

  @ManyToMany(() => Teacher, teacher => teacher.subjects, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  teachers: Teacher[];
}