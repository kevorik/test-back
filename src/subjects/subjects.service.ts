import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(page: number, limit: number, sortColumn: string, sortDirection: 'ASC' | 'DESC'): Promise<{ subjects: Subject[]; total: number }> {
    const [subjects, total] = await this.subjectRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
            [sortColumn]: sortDirection,
        },
    });
    return { subjects, total };
  }

  async findOne(id: number, fields?: string[]): Promise<Subject> {
    let select: Record<string, boolean> | undefined = undefined;
    if (fields) {
      select = {};
      
      for (const field of fields) {
        select[field] = true;
      }
    }

    const subject = await this.subjectRepository.findOne({ where: { id }, select });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { name } = createSubjectDto;
    const existingSubject = await this.subjectRepository.findOne({ where: { name } });

    if (existingSubject) {
      throw new ConflictException('Subject with this name already exists.');
    }

    const subject = this.subjectRepository.create(createSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    Object.assign(subject, updateSubjectDto);
    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await this.subjectRepository.remove(subject);
  }
}
