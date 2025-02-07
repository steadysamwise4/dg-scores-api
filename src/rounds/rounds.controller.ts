import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dtos/create-round-dto';
import { RoundDto } from './dtos/round.dto';

@Controller('rounds')
export class RoundsController {
  constructor(private roundsService: RoundsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(RoundDto)
  createRound(@Body() body: CreateRoundDto, @CurrentUser() user: User) {
    return this.roundsService.create(body, user);
  }
}
