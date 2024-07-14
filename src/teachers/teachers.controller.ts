import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { TeacherService } from '../teachers/teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './teacher.entity';

@Controller('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('sortColumn', new DefaultValuePipe('id')) sortColumn: string,
  @Query('sortDirection', new DefaultValuePipe('asc')) sortDirection: 'asc' | 'desc',
  ): Promise<{ teachers: Teacher[], total: number }> {
  const sortDirectionParam = sortDirection === 'desc' ? 'DESC' : 'ASC';
    return this.teacherService.findAll(page, limit, sortColumn, sortDirectionParam);
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
