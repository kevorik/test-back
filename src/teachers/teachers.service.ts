import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Subject } from 'src/subjects/subject.entity';
@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
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
    const foundTeacher = await this.teacherRepository.findOne({ where: { id }, relations: ['subjects'] });
    if (!foundTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (teacher.subjects) {
      const subjects = await this.subjectRepository.findByIds(teacher.subjects.map(subject => subject.id));
      foundTeacher.subjects = subjects;
    }

    Object.assign(foundTeacher, teacher);
    return this.teacherRepository.save(foundTeacher);
  }

  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
