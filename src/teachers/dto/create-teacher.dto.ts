import { IsNotEmpty, IsString, IsInt, Min, IsArray, ArrayMinSize, ValidateNested, IsBoolean, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class SubjectIdDto {
  @IsInt()
  @Min(1)
  id: number;
}

export class CreateTeacherDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsString()
  middle_name: string;

  @IsInt()
  @Min(1)
  schoolId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SubjectIdDto)
  subjects: SubjectIdDto[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;
}
