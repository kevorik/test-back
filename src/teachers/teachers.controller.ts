import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TeacherService } from '../teachers/teachers.service';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ teachers: Teacher[], total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.teacherService.findAll(pageNumber, limitNumber);
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
