import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeacherService } from '../teachers/teachers.service';
import { TeacherController } from '../teachers/teachers.controller';
import { Subject } from 'src/subjects/subject.entity';
import { School } from 'src/schools/school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Subject, School])],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
