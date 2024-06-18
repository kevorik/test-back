import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Class } from '../classes/class.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @ManyToOne(() => Class, classEntity => classEntity.students)
  class: Class;
}