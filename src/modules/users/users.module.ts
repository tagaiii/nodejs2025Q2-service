import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MemoryUserRepository } from './memory/memory-user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: MemoryUserRepository,
    },
  ],
})
export class UsersModule {}
