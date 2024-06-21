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

  async findAll(page: number, limit: number, ): Promise<{ students: Student[]; total: number }> {
    const [students, total] = await this.studentRepository.findAndCount({
      relations: ['class'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return { students, total };
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
