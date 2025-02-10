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

  findOne(id: number) {
    return this.repo.findOne({
      loadRelationIds: true,
      where: { id: id },
    });
  }

  async create(roundDto: CreateRoundDto, user: User) {
    const round = this.repo.create(roundDto);
    round.user = user;
    const course = await this.coursesService.find(roundDto.courseId);
    round.course = course;
    return this.repo.save(round);
  }

  async update(id: number, attrs: Partial<Round>, user: User) {
    const round = await this.findOne(id);
    if (!round) {
      const error = new NotFoundException('round not found');
      throw error;
    }
    if (user.id !== (round.user as unknown as number)) {
      const error = new UnauthorizedException('Unauthorized user');
      throw error;
    }
    Object.assign(round, attrs);
    return this.repo.save(round);
  }

  async remove(id: number, user: User) {
    const round = await this.findOne(id);
    console.log('round', round);
    if (!round) {
      throw new NotFoundException('round not found');
    }
    if (user.id !== (round.user as unknown as number)) {
      console.log('user.id', user.id);
      console.log('round.user', round.user);
      const error = new UnauthorizedException('Unauthorized user');
      throw error;
    }
    return this.repo.remove(round);
  }
}
