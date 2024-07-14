import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Subject name should not be empty' })
  @IsString({ message: 'Subject name must be a string' })
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;
}
