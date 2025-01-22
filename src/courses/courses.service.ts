import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dtos/create-course-dto';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  create(courseDto: CreateCourseDto) {
    const course = this.repo.create(courseDto);
    return this.repo.save(course);
  }
}
