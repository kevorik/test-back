import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async findAll(page: number, limit: number, sortColumn: string, sortDirection: 'ASC' | 'DESC'): Promise<{ schools: School[]; total: number }> {
    const [schools, total] = await this.schoolRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: {
            [sortColumn]: sortDirection,
        },
        relations: ['level'],
    });
    return { schools, total };
  }
  
  async findOne(id: number): Promise<School> {
    return this.schoolRepository.findOne({ where: { id }, relations: ['level']});
  }

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const {name, address, levelId, isActive, foundedDate } = createSchoolDto;
    const level = await this.schoolRepository.findOne({ where: { id: levelId } });
    if (!level) {
      throw new NotFoundException('Level not found');
    }

    const newSchool = this.schoolRepository.create({
      name,
      level,
      address,
      isActive,
      foundedDate
    });

    return this.schoolRepository.save(newSchool);
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);


    try {
      if (updateSchoolDto.name) {
        school.name = updateSchoolDto.name;
      }
      if (updateSchoolDto.address) {
        school.address = updateSchoolDto.address;
      }
      if (updateSchoolDto.isActive !== undefined) {
        school.isActive = updateSchoolDto.isActive;
      }
      if (updateSchoolDto.foundedDate) {
        school.foundedDate = updateSchoolDto.foundedDate;
      }
      if (updateSchoolDto.levelId) {
        school.level = { id: updateSchoolDto.levelId } as any;
      }

      return await this.schoolRepository.save(school);
    } catch (error) {
      console.error('Error updating student:', error);
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  async remove(id: number): Promise<void> {
    await this.schoolRepository.delete(id);
  }
}
