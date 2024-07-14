import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school.entity';
import { SchoolService } from '../schools/schools.service';
import { SchoolController } from '../schools/schools.controller';
import { Level } from 'src/level/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School, Level])],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
