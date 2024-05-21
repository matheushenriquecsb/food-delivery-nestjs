import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found!');
    }

    const decodedToken = await this.jwtService.verify(token);

    const user = await this.userService.findUser(decodedToken.id);

    if (!user) {
      throw new UnauthorizedException('User not exists!');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    if (Array.isArray(request.headers.token)) {
      return request.headers.token[0];
    }
    return request.headers.token;
  }
}
