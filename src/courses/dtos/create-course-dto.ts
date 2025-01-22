import { DifficultyOption, LengthOption } from '../course.entity';
import { IsString, IsLongitude, IsLatitude } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  length: LengthOption;

  @IsString()
  difficulty: DifficultyOption;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
