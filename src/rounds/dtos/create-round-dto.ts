import { IsNumber } from 'class-validator';

export class CreateRoundDto {
  @IsNumber()
  courseId: number;
}
