import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistRepository', useClass: MemoryRepository },
  ],
  imports: [TracksModule],
})
export class ArtistsModule {}
