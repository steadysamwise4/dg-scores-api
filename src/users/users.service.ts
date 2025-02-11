import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CoursesService } from 'src/courses/courses.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private coursesService: CoursesService,
  ) {}

  create(email: string, password: string, username: string) {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAll() {
    return this.repo.find();
  }

  async findCurrentUserWithData(user: User) {
    const userWithData = await this.repo.findOne({
      where: { id: user.id },
      relations: { favoriteCourses: true, rounds: true },
    });
    console.log('userWithData', userWithData);
    if (!userWithData) {
      throw new NotFoundException('user not found');
    }
    return userWithData;
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }

  async addFavorite(id: number, user: User) {
    const course = await this.coursesService.find(id);
    if (!course) {
      throw new NotFoundException('course not found');
    }
    const userWithFavorites = await this.repo.findOne({
      where: { id: user.id },
      relations: { favoriteCourses: true },
    });
    if (!userWithFavorites) {
      throw new NotFoundException('user not found');
    }
    user.favoriteCourses = [...userWithFavorites.favoriteCourses, course];
    return this.repo.save(user);
  }
}
