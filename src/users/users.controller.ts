import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.usersService.login(loginDto);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    return this.usersService.register(registerDto);
  }
}
