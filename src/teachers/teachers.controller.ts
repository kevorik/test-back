import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TeacherService } from '../teachers/teachers.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post()
  create(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.create(teacher);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() teacher: Teacher): Promise<Teacher> {
    return this.teacherService.update(id, teacher);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
