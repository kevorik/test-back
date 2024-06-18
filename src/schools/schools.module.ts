import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school.entity';
import { SchoolService } from '../schools/schools.service';
import { SchoolController } from '../schools/schools.controller';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  providers: [SchoolService],
  controllers: [SchoolController],
})
export class SchoolModule {}
