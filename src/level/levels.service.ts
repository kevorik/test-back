import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './level.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  findAll(): Promise<Level[]> {
    return this.levelRepository.find();
  }

  findOne(id: number): Promise<Level> {
    return this.levelRepository.findOneBy({id});
  }

  create(level: Level): Promise<Level> {
    return this.levelRepository.save(level);
  }

  async update(id: number, level: Level): Promise<void> {
    await this.levelRepository.update(id, level);
  }

  async remove(id: number): Promise<void> {
    await this.levelRepository.delete(id);
  }
}
