import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @Serialize(UserDto)
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password, body.username);
  }

  @Post('/signin')
  signin(@Body() body: Partial<CreateUserDto>) {
    if (!body.email || !body.password) {
      throw new BadRequestException('email and password required');
    }
    return this.authService.signin(body.email, body.password);
  }
}
