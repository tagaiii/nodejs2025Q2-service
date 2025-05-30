import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: MemoryRepository,
    },
  ],
})
export class UsersModule {}
