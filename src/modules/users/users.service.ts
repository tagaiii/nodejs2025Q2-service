import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { IUserRepository } from './interfaces/user-repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly userRepo: IUserRepository,
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
    return new UserResponseDto(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const updatedUser = await this.userRepo.updatePassword(
      id,
      updatePasswordDto,
    );

    return new UserResponseDto(updatedUser);
  }

  remove(id: string) {
    return this.userRepo.delete(id);
  }
}
