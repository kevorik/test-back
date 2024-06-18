import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SchoolModule } from './schools/schools.module';
import { TeacherModule } from './teachers/teachers.module';
import { StudentModule } from './students/students.module';
import { ClassModule } from './classes/classes.module';
import { SubjectModule } from './subjects/subjects.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    SchoolModule,
    TeacherModule,
    StudentModule,
    ClassModule,
    SubjectModule,
  ],
})
export class AppModule {}
