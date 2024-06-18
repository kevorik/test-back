import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['school', 'subjects'] });
  }

  findOne(id: number): Promise<Teacher> {
    return this.teacherRepository.findOneBy({ id });
  }

  create(teacher: Teacher): Promise<Teacher> {
    return this.teacherRepository.save(teacher);
  }

  async update(id: number, teacher: Teacher): Promise<Teacher> {
    await this.teacherRepository.update(id, teacher);
    return this.teacherRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
