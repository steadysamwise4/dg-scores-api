import { Expose, Transform } from 'class-transformer';
import { DifficultyOption, LengthOption } from '../course.entity';

export class CourseDto {
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

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
