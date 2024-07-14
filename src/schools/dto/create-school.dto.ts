import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateSchoolDto {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDateString()
  @IsOptional()
  foundedDate?: Date;

  @IsInt({ message: 'Class prefect ID must be an integer' })
  @Min(1, { message: 'Class prefect ID must be at least 1' })
  levelId: number;
}
