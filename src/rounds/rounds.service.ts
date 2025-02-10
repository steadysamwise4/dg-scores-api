import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const round = this.repo.create(roundDto);
    round.user = user;
    const course = await this.coursesService.find(roundDto.courseId);
    round.course = course;
    return this.repo.save(round);
  }

  async update(id: number, attrs: Partial<Round>, user: User) {
    const round = await this.repo.findOne({
      loadRelationIds: true,
      where: { id: id },
    });
    if (!round) {
      const error = new NotFoundException('round not found');
      throw error;
    }
    if (user.id !== (round.user as unknown as number)) {
      const error = new UnauthorizedException('Unauthorized user');
      throw error;
    }
    console.log('user.id:', round.user.id);
    console.log('round:', round);
    console.log('attrs:', attrs);

    Object.assign(round, attrs);
    console.log('round:', round);
    return this.repo.save(round);
  }
}
