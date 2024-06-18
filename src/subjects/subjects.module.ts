import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { SubjectService } from '../subjects/subjects.service';
import { SubjectController } from '../subjects/subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
