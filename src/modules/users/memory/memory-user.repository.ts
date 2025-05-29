import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { User } from '../entities/user.entity';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class MemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    if (!this.users.find((user) => user.id === id)) {
      throw new NotFoundException('User not found!');
    }
    return this.users.find((user) => user.id === id);
  }

  async create(data: CreateUserDto): Promise<User> {
    const currentTime = Date.now();
    const newUser = {
      id: randomUUID(),
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
      ...data,
    };

    this.users.push(newUser);

    return newUser;
  }

  async updatePassword(id: string, data: UpdatePasswordDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== data.oldPassword) {
      throw new ForbiddenException('Incorrect old password!');
    }
    user.password = data.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found!');
    }

    this.users.splice(userIndex, 1);

    return true;
  }
}
