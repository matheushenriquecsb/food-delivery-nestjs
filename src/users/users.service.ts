import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Partial<User>> {
    const checkEmail = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (checkEmail) {
      throw new BadRequestException(
        `Email ${registerDto.email} already registered`,
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    try {
      const user = await this.userModel.create({
        ...registerDto,
        password: hashedPassword,
      });

      const { email } = user;

      return { email };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(payload: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({
      email: payload[0],
    });

    if (!user)
      throw new NotFoundException(
        `User with email ${payload[0]}, not found in database`,
      );

    const checkPassword = await bcrypt.compare(payload[1], user.password);

    if (!checkPassword) throw new BadRequestException('Wrong Credentials');

    return {
      access_token: await this.jwtService.signAsync({ id: user.id }),
    };
  }
}
