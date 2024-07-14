import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { Subject } from 'src/subjects/subject.entity';
import { School } from 'src/schools/school.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async findAll(page: number, limit: number, sortColumn: string, sortDirection: 'ASC' | 'DESC'): Promise<{ teachers: Teacher[]; total: number }> {
    const [teachers, total] = await this.teacherRepository.findAndCount({
        relations: ['school', 'subjects'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
            [sortColumn]: sortDirection,
        },
    });
    return { teachers, total };
}

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({ where: { id }, relations: ['school', 'subjects'] });
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { schoolId, subjects, ...teacherData } = createTeacherDto;
    const school = await this.schoolRepository.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    const teacherSubjects = await this.subjectRepository.findByIds(subjects.map(subject => subject.id));
    const teacher = this.teacherRepository.create({ ...teacherData, school, subjects: teacherSubjects });
    return this.teacherRepository.save(teacher);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const { schoolId, subjects, ...teacherData } = updateTeacherDto;
    const teacher = await this.findOne(id);

    if (schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: schoolId } });
      if (!school) {
        throw new NotFoundException('School not found');
      }
      teacher.school = school;
    }

    if (subjects) {
      const teacherSubjects = await this.subjectRepository.findByIds(subjects.map(subject => subject.id));
      teacher.subjects = teacherSubjects;
    }

    Object.assign(teacher, teacherData);
    return this.teacherRepository.save(teacher);
  }

  async remove(id: number): Promise<void> {
    const teacher = await this.findOne(id);
    await this.teacherRepository.remove(teacher);
  }
}
