import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepo: MemoryRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);

    return new UserResponseDto(newUser);
  }

  async findAll() {
    const users = await this.userRepo.findAll();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return new UserResponseDto(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong!');
    }
    const updatedUser = await this.userRepo.update(id, {
      password: updatePasswordDto.newPassword,
    });

    return new UserResponseDto(updatedUser);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userRepo.delete(id);
  }
}
