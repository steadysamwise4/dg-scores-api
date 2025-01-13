import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoundsModule } from './rounds/rounds.module';

@Module({
  imports: [UsersModule, RoundsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
