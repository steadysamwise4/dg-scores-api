import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import { RoundsService } from './rounds.service';
import { CreateRoundDto } from './dtos/create-round-dto';
import { RoundDto } from './dtos/round.dto';
import { UpdateRoundDto } from './dtos/update-round-dto';

@UseGuards(AuthGuard)
@Controller('rounds')
export class RoundsController {
  constructor(private roundsService: RoundsService) {}

  @Post()
  @Serialize(RoundDto)
  createRound(@Body() body: CreateRoundDto, @CurrentUser() user: User) {
    return this.roundsService.create(body, user);
  }

  @Patch('/:id')
  @Serialize(RoundDto)
  updateRound(
    @Param('id') id: string,
    @Body() body: UpdateRoundDto,
    @CurrentUser() user: User,
  ) {
    const userId = parseInt(id);
    return this.roundsService.update(userId, body, user);
  }

  @Delete('/:id')
  removeRound(@Param('id') id: string, @CurrentUser() user: User) {
    return this.roundsService.remove(parseInt(id), user);
  }
}
