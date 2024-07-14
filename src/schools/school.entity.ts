import { Class } from 'src/classes/class.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Level } from '../level/level.entity';

@Entity('school')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: true })
  foundedDate: Date;

  @OneToMany(() => Teacher, teacher => teacher.school)
  teachers: Teacher[];

  @OneToMany(() => Class, classEntity => classEntity.school)
  classes: Class[];

  @ManyToOne(() => Level, level => level.schools)
  @JoinColumn({ name: 'levelId' })
  level: Level;
}
