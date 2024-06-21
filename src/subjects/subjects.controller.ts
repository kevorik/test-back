import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SubjectService } from '../subjects/subjects.service';
import { Subject } from './subject.entity';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ subjects: Subject[], total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.subjectService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @Post()
  create(@Body() subject: Subject): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() subject: Subject): Promise<Subject> {
    return this.subjectService.update(id, subject);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
