import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateCourseDto } from './dtos/create-course-dto';
import { CoursesService } from './courses.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CourseDto } from './dtos/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(CourseDto)
  createCourse(@Body() body: CreateCourseDto, @CurrentUser() user: User) {
    return this.coursesService.create(body, user);
  }
}
