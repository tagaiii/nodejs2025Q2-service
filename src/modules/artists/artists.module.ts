import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MemoryArtistRepository } from './memory/memory-artist.repository';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistRepository', useClass: MemoryArtistRepository },
  ],
})
export class ArtistsModule {}
