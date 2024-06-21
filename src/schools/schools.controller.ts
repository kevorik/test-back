import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SchoolService } from '../schools/schools.service';
import { School } from './school.entity';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{ schools: School[], total: number }> {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.schoolService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<School> {
    return this.schoolService.findOne(id);
  }

  @Post()
  create(@Body() school: School): Promise<School> {
    return this.schoolService.create(school);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() school: School): Promise<School> {
    return this.schoolService.update(id, school);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.schoolService.remove(id);
  }
}
