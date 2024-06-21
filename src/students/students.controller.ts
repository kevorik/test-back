import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { StudentService } from '../students/students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ students: Student[], total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.studentService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() student: Student): Promise<Student> {
    return this.studentService.create(student);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() student: Student): Promise<Student> {
    return this.studentService.update(id, student);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.studentService.remove(id);
  }
}
