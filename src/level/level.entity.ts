import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { School } from '../schools/school.entity';

@Entity('level')
export class Level {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => School, school => school.level)
  schools: School[];
}
