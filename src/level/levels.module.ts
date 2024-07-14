// level.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './level.entity';
import { LevelService } from '../level/levels.service';
import { LevelController } from '../level/levels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  providers: [LevelService],
  controllers: [LevelController],
})
export class LevelModule {}
