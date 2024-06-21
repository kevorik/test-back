import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(page: number, limit: number): Promise<{ subjects: Subject[]; total: number }> {
    const [subjects, total] = await this.subjectRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { subjects, total };
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOneBy({ id });
  }
  
  async create(subject: Subject): Promise<Subject> {
    const { name } = subject;
    const existingSubject = await this.subjectRepository.findOne({ where: { name } });

    if (existingSubject) {
      throw new ConflictException('Subject with this name already exists.');
    }

    return this.subjectRepository.save(subject);
  }

  async update(id: number, subject: Subject): Promise<Subject> {
    await this.subjectRepository.update(id, subject);
    return this.subjectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
