import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateRoundDto {
  @IsOptional()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsNumber()
  total: number;

  @IsOptional()
  @IsArray()
  holeScores: number[];

  @IsOptional()
  @IsBoolean()
  isHome: boolean;

  @IsOptional()
  @IsBoolean()
  isNine: boolean;

  @IsOptional()
  @IsBoolean()
  isComplete: boolean;
}
