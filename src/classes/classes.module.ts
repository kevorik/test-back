import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { ClassService } from '../classes/classes.service';
import { ClassController } from '../classes/classes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Class])],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
