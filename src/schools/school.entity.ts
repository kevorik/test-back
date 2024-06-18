import { Class } from 'src/classes/class.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('school') 
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Teacher, teacher => teacher.school)
  teachers: Teacher[];

  @OneToMany(() => Class, classEntity => classEntity.school)
  classes: Class[];
}
