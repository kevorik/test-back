import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClassService } from '../classes/classes.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  ): Promise<Class[]> {
    return this.classService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Class> {
    return this.classService.findOne(id);
  }

  @Post()
  create(@Body() classEntity: Class): Promise<Class> {
    return this.classService.create(classEntity);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() classEntity: Class): Promise<Class> {
    return this.classService.update(id, classEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.classService.remove(id);
  }
}
