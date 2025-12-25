import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  credit: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  capacity?: number;

  @IsOptional()
  @IsString()
  teacherName?: string;
}