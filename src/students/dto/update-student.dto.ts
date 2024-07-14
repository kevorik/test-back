import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  first_name?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  last_name?: string;

  @IsOptional()
  @IsString({ message: 'Middle name must be a string' })
  middle_name?: string;

  @IsOptional()
  @IsInt({ message: 'Class ID must be an integer' })
  @Min(1, { message: 'Class ID must be at least 1' })
  classId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;
}
