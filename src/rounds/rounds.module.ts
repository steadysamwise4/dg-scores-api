import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';
import { Round } from './round.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Round]), CoursesModule, UsersModule],
  controllers: [RoundsController],
  providers: [RoundsService],
})
export class RoundsModule {}
