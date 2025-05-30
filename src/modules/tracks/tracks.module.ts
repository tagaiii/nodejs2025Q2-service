import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TrackRepository',
      useClass: MemoryRepository,
    },
  ],
})
export class TracksModule {}
