import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const cryptSalt = this.configService.get<string>('CRYPT_SALT');
    createUserDto.password = await hash(
      createUserDto.password,
      Number(cryptSalt),
    );

    const currentTimestamp = Date.now();
    const user = this.userRepo.create({
      ...createUserDto,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });

    const newUser = await this.userRepo.save(user);

    return new UserResponseDto(newUser);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return new UserResponseDto(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong!');
    }
    await this.userRepo.update(id, {
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
    });
    const updatedUser = await this.userRepo.findOneBy({ id: id });

    return new UserResponseDto(updatedUser);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userRepo.delete(id);
  }
}
