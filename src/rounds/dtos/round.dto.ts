import { Expose, Transform } from 'class-transformer';

export class RoundDto {
  @Expose()
  id: number;

  @Expose()
  holeScores: number[];

  @Expose()
  total: number;

  @Expose()
  isNine: boolean;

  @Expose()
  isComplete: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;

  @Transform(({ obj }) => obj.course.id)
  @Expose()
  courseId: number;
}
