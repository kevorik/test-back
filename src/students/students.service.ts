import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['class'] });
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ id });
  }

  create(student: Student): Promise<Student> {
    return this.studentRepository.save(student);
  }

  async update(id: number, student: Student): Promise<Student> {
    await this.studentRepository.update(id, student);
    return this.studentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
