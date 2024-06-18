import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  findAll(): Promise<School[]> {
    return this.schoolRepository.find();
  }

  findOne(id: number): Promise<School> {
    return this.schoolRepository.findOneBy({ id });
  }

  create(school: School): Promise<School> {
    return this.schoolRepository.save(school);
  }

  async update(id: number, school: School): Promise<School> {
    await this.schoolRepository.update(id, school);
    return this.schoolRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.schoolRepository.delete(id);
  }
}
