// level.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LevelService } from '../level/levels.service';
import { Level } from './level.entity';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  findAll() {
    return this.levelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.levelService.findOne(id);
  }

  @Post()
  create(@Body() level: Level) {
    return this.levelService.create(level);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() level: Level) {
    return this.levelService.update(id, level);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.levelService.remove(id);
  }
}
