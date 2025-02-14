import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { LengthOption, DifficultyOption } from '../../courses/course.entity';
import { CourseDto } from '../../courses/dtos/course.dto';

class NestedCourseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  length: LengthOption;

  @Expose()
  difficulty: DifficultyOption;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

class NestedRoundDto {
  @Expose()
  id: number;

  @Expose()
  date: Date;

  @Expose()
  holeScores: number[];

  @Expose()
  total: number;

  @Expose()
  isHome: boolean;

  @Expose()
  isNine: boolean;

  @Expose()
  isComplete: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @ValidateNested()
  @Type(() => CourseDto)
  course: CourseDto;
}

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  handicap: number;

  @Expose()
  createdAt: Date;

  @Expose()
  @ValidateNested()
  @Type(() => NestedRoundDto)
  rounds: NestedRoundDto[];

  @Expose()
  @ValidateNested()
  @Type(() => NestedCourseDto)
  favoriteCourses: NestedCourseDto[];
}
