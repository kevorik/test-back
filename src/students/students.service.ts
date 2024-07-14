import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // async findAll(page: number, limit: number, sortColumn?: string, sortDirection?: 'ASC' | 'DESC'): Promise<{ students: Student[]; total: number }> {
  //   const queryBuilder = this.studentRepository.createQueryBuilder('student')
  //     .leftJoinAndSelect('student.class', 'class')
  //     .skip((page - 1) * limit)
  //     .take(limit);

  //   if (sortColumn && sortDirection) {
  //     queryBuilder.orderBy(`student.${sortColumn}`, sortDirection);
  //   }

  //   const [students, total] = await queryBuilder.getManyAndCount();
  //   return { students, total };
  // }

  // relations: ['school', 'subjects'],
  // .leftJoinAndSelect('student.class', 'class')

  async findAll(page: number, limit: number, sortColumn: string, sortDirection: 'ASC' | 'DESC'): Promise<{ students: Student[]; total: number }> {
    const [students, total] = await this.studentRepository.findAndCount({
        relations: ['class'],
        skip: (page - 1) * limit,
        take: limit,
        order: {
            [sortColumn]: sortDirection,
        },
    });
    return { students, total };
}


  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = this.studentRepository.create({
        first_name: createStudentDto.first_name,
        last_name: createStudentDto.last_name,
        middle_name: createStudentDto.middle_name,
        class: { id: createStudentDto.classId } as any, // создание связи с классом по ID
      });

      return await this.studentRepository.save(student);
    } catch (error) {
      console.error('Error creating student:', error);
      throw new InternalServerErrorException('Failed to create student');
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);

    try {
      if (updateStudentDto.first_name) {
        student.first_name = updateStudentDto.first_name;
      }
      if (updateStudentDto.last_name) {
        student.last_name = updateStudentDto.last_name;
      }
      if (updateStudentDto.middle_name) {
        student.middle_name = updateStudentDto.middle_name;
      }
      if (updateStudentDto.classId) {
        student.class = { id: updateStudentDto.classId } as any; // обновление связи с классом по ID
      }

      return await this.studentRepository.save(student);
    } catch (error) {
      console.error('Error updating student:', error);
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    try {
      await this.studentRepository.remove(student);
    } catch (error) {
      console.error('Error removing student:', error);
      throw new InternalServerErrorException('Failed to remove student');
    }
  }
}
