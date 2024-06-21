import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ClassService } from '../classes/classes.service';
import { Class } from './class.entity';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ classes: Class[], total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.classService.findAll(pageNumber, limitNumber);
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
