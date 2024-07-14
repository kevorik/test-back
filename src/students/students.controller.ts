import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { StudentService } from '../students/students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('sortColumn', new DefaultValuePipe('id')) sortColumn: string,
  @Query('sortDirection', new DefaultValuePipe('asc')) sortDirection: 'asc' | 'desc',
  ): Promise<{ students: Student[], total: number }> {
  const sortDirectionParam = sortDirection === 'desc' ? 'DESC' : 'ASC';
    return this.studentService.findAll(page, limit, sortColumn, sortDirectionParam);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.studentService.remove(id);
  }
}
