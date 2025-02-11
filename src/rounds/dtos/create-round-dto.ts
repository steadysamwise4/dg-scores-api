import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateRoundDto {
  @IsNumber()
  courseId: number;

  @IsDateString()
  date: Date;

  @IsOptional()
  @IsArray()
  holeScores: number[];

  @IsOptional()
  @IsNumber()
  total: number;

  @IsBoolean()
  isHome: boolean;

  @IsOptional()
  @IsBoolean()
  isNine: boolean;

  @IsOptional()
  @IsBoolean()
  isComplete: boolean;
}
