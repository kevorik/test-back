import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from '../classes/classes.service';
import { ClassController } from '../classes/classes.controller';
import { School } from 'src/schools/school.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Student } from 'src/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class,School,Teacher,Student])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
