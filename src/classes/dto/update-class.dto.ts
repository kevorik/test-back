import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateClassDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Class name should not be empty' })
  @IsString({ message: 'Class name must be a string' })
  name?: string;

  @IsOptional()
  @IsInt({ message: 'School ID must be an integer' })
  @Min(1, { message: 'School ID must be at least 1' })
  schoolId?: number;

  @IsOptional()
  @IsInt({ message: 'Class teacher ID must be an integer' })
  @Min(1, { message: 'Class teacher ID must be at least 1' })
  classTeacherId?: number;

  @IsOptional()
  @IsInt({ message: 'Class prefect ID must be an integer' })
  @Min(1, { message: 'Class prefect ID must be at least 1' })
  classPrefectId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;
}
