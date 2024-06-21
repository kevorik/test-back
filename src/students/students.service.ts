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

  async findAll(page: number = 1, limit: number = 10): Promise<Student[]> {
    const skip = (page - 1) * limit;
    const students = await this.studentRepository.find({
      relations: ['class'],
      skip,
      take: limit,
    });
    return students;
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
