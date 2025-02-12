import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from '../courses/courses.service';
import { Round } from './round.entity';
import { Repository } from 'typeorm';
import { CreateRoundDto } from './dtos/create-round-dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LengthOption, DifficultyOption } from '../courses/course.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round) private repo: Repository<Round>,
    private coursesService: CoursesService,
    private usersService: UsersService,
  ) {}

  findOne(id: number) {
    return this.repo.findOne({
      loadRelationIds: true,
      where: { id: id },
    });
  }

  async create(roundDto: CreateRoundDto, user: User) {
    const [incompleteRound] = await this.repo.find({
      where: { user, isComplete: false },
    });

    if (incompleteRound) {
      return { id: incompleteRound.id };
    }

    const round = this.repo.create(roundDto);
    round.user = user;
    const course = await this.coursesService.find(roundDto.courseId);
    round.course = course;
    this.calculateRoundProps(round);
    await this.repo.save(round);
    this.calculateHandicap(user);
    return round;
  }

  async update(id: number, attrs: Partial<Round>, user: User) {
    const round = await this.findOne(id);
    if (!round) {
      const error = new NotFoundException('round not found');
      throw error;
    }
    if (round.isComplete) {
      const error = new MethodNotAllowedException(
        'Finished rounds cannot be edited.',
      );
      throw error;
    }
    if (user.id !== (round.user as unknown as number)) {
      const error = new UnauthorizedException('Unauthorized user');
      throw error;
    }
    Object.assign(round, attrs);
    this.calculateRoundProps(round);
    await this.repo.save(round);
    this.calculateHandicap(user);
    return round;
  }

  async remove(id: number, user: User) {
    const round = await this.findOne(id);
    if (!round) {
      throw new NotFoundException('round not found');
    }
    if (user.id !== (round.user as unknown as number)) {
      const error = new UnauthorizedException('Unauthorized user');
      throw error;
    }
    return this.repo.remove(round);
  }

  calculateRoundProps(round: Round) {
    let adjustedTotal = undefined;
    if (round.isComplete) {
      if (round.isNine) {
        adjustedTotal = round.total * 2;
      } else {
        adjustedTotal = round.total;
      }
      if (round.course.difficulty === DifficultyOption.EASY) {
        adjustedTotal += 2;
      }
      if (round.course.difficulty === DifficultyOption.HARD) {
        adjustedTotal -= 2;
      }
      if (round.course.length === LengthOption.SHORT) {
        adjustedTotal += 2;
      }
      if (round.course.length === LengthOption.LONG) {
        adjustedTotal -= 2;
      }
      if (round.isHome) {
        adjustedTotal += 1;
      }
      round.adjustedTotal = adjustedTotal;
    }
  }

  async calculateHandicap(user: User) {
    let currentAverageScore = null;
    if (user.handicap) {
      currentAverageScore = user.handicap + 54;
    }
    const usersAdjustedRounds = await this.repo.find({
      // select: { adjustedTotal: true },
      where: { user: { id: user.id }, isComplete: true },
      order: { date: 'DESC' },
      take: 20,
    });

    if (usersAdjustedRounds.length < 3) {
      return;
    }
    const scoresArr = [];
    for (const round of usersAdjustedRounds) {
      if (
        currentAverageScore &&
        Math.abs(round.adjustedTotal - currentAverageScore) > 7
      ) {
        continue;
      }
      scoresArr.push(round.adjustedTotal);
    }
    const handicapArr = this.getSmallestNumbers(scoresArr);
    const sum = handicapArr.reduce((partialSum, a) => partialSum + a, 0);
    const newHandicap = Math.round(sum / handicapArr.length) - 54;
    user.handicap = newHandicap;
    this.usersService.save(user);
  }

  getSmallestNumbers(arr: number[]) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    return sortedArr.slice(0, Math.min(8, arr.length));
  }
}
