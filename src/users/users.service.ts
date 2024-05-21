import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const userEmail = await this.usersRepository.findOneBy({
      email: registerDto.email,
    });

    if (userEmail) {
      throw new BadRequestException(`Email already has a user. Try again!`);
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      await this.usersRepository.save({
        ...registerDto,
        password: hashedPassword,
      });

      return { message: 'Success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(payload: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOneBy({
      email: payload[0],
    });

    if (!user) throw new NotFoundException(`Wrong Credentials`);

    const verifyPassword = await bcrypt.compare(payload[1], user.password);

    if (!verifyPassword) throw new BadRequestException('Wrong Credentials');

    return {
      access_token: await this.jwtService.signAsync({ id: user.id }),
    };
  }

  public async findUser(userId: string) {
    const user = await this.usersRepository.findOneBy({
      id: +userId,
    });

    return user;
  }
}
