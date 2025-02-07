import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { Round } from './round.entity';
import { Repository } from 'typeorm';
import { CreateRoundDto } from './dtos/create-round-dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round) private repo: Repository<Round>,
    private coursesService: CoursesService,
  ) {}

  async create(roundDto: CreateRoundDto, user: User) {
    const round = this.repo.create();
    round.user = user;
    const course = await this.coursesService.find(roundDto.courseId);
    round.course = course;
    return this.repo.save(round);
  }
}
