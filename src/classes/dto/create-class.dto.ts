import { IsNotEmpty, IsString, IsInt, Min, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty({ message: 'Class name should not be empty' })
  @IsString({ message: 'Class name must be a string' })
  name: string;

  @IsInt({ message: 'School ID must be an integer' })
  @Min(1, { message: 'School ID must be at least 1' })
  schoolId: number;

  @IsInt({ message: 'Class teacher ID must be an integer' })
  @Min(1, { message: 'Class teacher ID must be at least 1' })
  classTeacherId: number;

  @IsInt({ message: 'Class prefect ID must be an integer' })
  @Min(1, { message: 'Class prefect ID must be at least 1' })
  classPrefectId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;
}
