

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { School } from '../schools/school.entity';
import { Subject } from '../subjects/subject.entity';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  middle_name: string;

  @ManyToOne(() => School, school => school.teachers)
  school: School;

  @ManyToMany(() => Subject, subject => subject.teachers)
  @JoinTable({
    name: 'teachers_subject',
  })
  subjects: Subject[];
}