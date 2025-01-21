import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoundsModule } from './rounds/rounds.module';
import { CoursesModule } from './courses/courses.module';
import { User } from './users/user.entity';
import { Round } from './rounds/round.entity';
import { Course } from './courses/course.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Round, Course],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    RoundsModule,
    CoursesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
