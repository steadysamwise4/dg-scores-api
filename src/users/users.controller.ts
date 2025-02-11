import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Post,
  // Request,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from './user.entity';

@UseGuards(AuthGuard)
@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/all')
  findAllUsers(@CurrentUser() user: User) {
    console.log(user);
    return this.usersService.findAll();
  }

  @Get('/current')
  findCurrentUser(@CurrentUser() user: User) {
    console.log(user);
    return this.usersService.findCurrentUserWithData(user);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Post('/:courseId')
  addFavorite(@Param('courseId') id: string, @CurrentUser() user: User) {
    return this.usersService.addFavorite(parseInt(id), user);
  }
}
