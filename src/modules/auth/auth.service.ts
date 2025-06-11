import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: AuthDto) {
    const user = await this.userRepo.findOneBy({ login: signupDto.login });
    if (user) {
      throw new ConflictException(
        `User with login ${signupDto.login} already exists!`,
      );
    }

    return await this.userService.create(signupDto);
  }

  async login(loginDto: AuthDto) {
    const user = await this.userRepo.findOneBy({ login: loginDto.login });

    if (!user || !(await compare(loginDto.password, user.password))) {
      throw new ForbiddenException('Login or password is incorrect!');
    }
    const payload = { userId: user.id, login: user.login };
    return await this.generateTokens(payload);
  }

  async generateTokens(payload: JwtPayload) {
    const refreshTokenKey = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_KEY',
    );
    const refreshTokenExpireTime = this.configService.get<string>(
      'TOKEN_REFRESH_EXPIRE_TIME',
    );
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: refreshTokenKey,
        expiresIn: refreshTokenExpireTime,
      }),
    };
  }
}
