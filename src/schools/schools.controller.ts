import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { SchoolService } from '../schools/schools.service';
import { School } from './school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('schools')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('sortColumn', new DefaultValuePipe('id')) sortColumn: string,
  @Query('sortDirection', new DefaultValuePipe('asc')) sortDirection: 'asc' | 'desc',
  ): Promise<{ schools: School[], total: number }> {
  const sortDirectionParam = sortDirection === 'desc' ? 'DESC' : 'ASC';
    return this.schoolService.findAll(page, limit, sortColumn, sortDirectionParam);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<School> {
    return this.schoolService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createSchoolDto: CreateSchoolDto): Promise<School> {
    return this.schoolService.create(createSchoolDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() updateSchoolDto: UpdateSchoolDto): Promise<School> {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.schoolService.remove(id);
  }
}
