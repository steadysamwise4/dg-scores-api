import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course-dto';
import { CoursesService } from './courses.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard)
  createCourse(@Body() body: CreateCourseDto) {
    return this.coursesService.create(body);
  }
}
