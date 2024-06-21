import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async findAll(page: number = 1, limit: number = 10): Promise<Class[]> {
      const skip = (page - 1) * limit;
      const classes = await this.classRepository.find({
        relations: ['school', 'classTeacher', 'classPrefect', 'students'],
        skip,
        take: limit,
      });
      return classes;
    }

  findOne(id: number): Promise<Class> {
    return this.classRepository.findOneBy({ id });
  }

  create(classEntity: Class): Promise<Class> {
    return this.classRepository.save(classEntity);
  }

  async update(id: number, classEntity: Class): Promise<Class> {
    await this.classRepository.update(id, classEntity);
    return this.classRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
