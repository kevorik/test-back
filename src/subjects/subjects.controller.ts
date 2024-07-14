import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { SubjectService } from '../subjects/subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './subject.entity';
import { FindOneSubjectQuery } from './dto/find-one-subject-query.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  @Query('sortColumn', new DefaultValuePipe('id')) sortColumn: string,
  @Query('sortDirection', new DefaultValuePipe('asc')) sortDirection: 'asc' | 'desc',
  ): Promise<{ subjects: Subject[], total: number }> {
  const sortDirectionParam = sortDirection === 'desc' ? 'DESC' : 'ASC';
    return this.subjectService.findAll(page, limit, sortColumn, sortDirectionParam);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Query() query: FindOneSubjectQuery): Promise<Subject> {
    console.log(query);
    return this.subjectService.findOne(id, query.fields);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(createSubjectDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject> {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
