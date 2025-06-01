import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  controllers: [TracksController],
  providers: [
    TracksService,
    {
      provide: 'TrackRepository',
      useClass: MemoryRepository,
    },
  ],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TracksService],
})
export class TracksModule {}
