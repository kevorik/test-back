import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { School } from '../schools/school.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Student } from '../students/student.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => School, school => school.classes, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  school: School;

  @ManyToOne(() => Teacher, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  classTeacher: Teacher;

  @ManyToOne(() => Student, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  classPrefect: Student;

  @OneToMany(() => Student, student => student.class)
  students: Student[];
}
