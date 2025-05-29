import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  create(data: CreateUserDto): Promise<User>;
  updatePassword(id: string, data: UpdatePasswordDto): Promise<User>;
  delete(id: string): Promise<void>;
}
