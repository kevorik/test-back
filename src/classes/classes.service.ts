import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { School } from '../schools/school.entity';
import { Teacher } from '../teachers/teacher.entity';
import { Student } from '../students/student.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll(page: number, limit: number): Promise<{ classes: Class[]; total: number }> {
    const [classes, total] = await this.classRepository.findAndCount({
      relations: ['school', 'classTeacher', 'classPrefect', 'students'],
      skip: (page - 1) * limit,
      take: limit,
    });
    return { classes, total };
  }

  async findOne(id: number): Promise<Class> {
    const classEntity = await this.classRepository.findOne({ where: { id }, relations: ['school', 'classTeacher', 'classPrefect', 'students'] });
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    return classEntity;
  }

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const { name, schoolId, classTeacherId, classPrefectId } = createClassDto;

    const school = await this.schoolRepository.findOne({ where: { id: schoolId } });
    if (!school) {
      throw new NotFoundException('School not found');
    }

    const classTeacher = await this.teacherRepository.findOne({ where: { id: classTeacherId } });
    if (!classTeacher) {
      throw new NotFoundException('Class teacher not found');
    }

    const classPrefect = await this.studentRepository.findOne({ where: { id: classPrefectId } });
    if (!classPrefect) {
      throw new NotFoundException('Class prefect not found');
    }

    const newClass = this.classRepository.create({
      name,
      school,
      classTeacher,
      classPrefect,
    });

    return this.classRepository.save(newClass);
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    const { name, schoolId, classTeacherId, classPrefectId } = updateClassDto;
    const classEntity = await this.findOne(id);

    if (schoolId) {
      const school = await this.schoolRepository.findOne({ where: { id: schoolId } });
      if (!school) {
        throw new NotFoundException('School not found');
      }
      classEntity.school = school;
    }

    if (classTeacherId) {
      const classTeacher = await this.teacherRepository.findOne({ where: { id: classTeacherId } });
      if (!classTeacher) {
        throw new NotFoundException('Class teacher not found');
      }
      classEntity.classTeacher = classTeacher;
    }

    if (classPrefectId) {
      const classPrefect = await this.studentRepository.findOne({ where: { id: classPrefectId } });
      if (!classPrefect) {
        throw new NotFoundException('Class prefect not found');
      }
      classEntity.classPrefect = classPrefect;
    }

    if (name) {
      classEntity.name = name;
    }

    return this.classRepository.save(classEntity);
  }

  async remove(id: number): Promise<void> {
    const classEntity = await this.findOne(id);
    await this.classRepository.remove(classEntity);
  }
}
//a