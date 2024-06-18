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

  @ManyToOne(() => School, school => school.classes)
  school: School;

  @ManyToOne(() => Teacher)
  classTeacher: Teacher;

  @ManyToOne(() => Student)
  classPrefect: Student;

  @OneToMany(() => Student, student => student.class)
  students: Student[];
}
