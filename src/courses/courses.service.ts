import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/create-course-dto';
import { User } from '../users/user.entity';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  create(courseDto: CreateCourseDto, user: User) {
    const course = this.repo.create(courseDto);
    course.user = user;
    return this.repo.save(course);
  }

  find(courseId: number) {
    return this.repo.findOne({ where: { id: courseId } });
  }
}
