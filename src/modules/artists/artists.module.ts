import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    { provide: 'ArtistRepository', useClass: MemoryRepository },
  ],
  imports: [forwardRef(() => TracksModule), forwardRef(() => AlbumsModule)],
  exports: [ArtistsService],
})
export class ArtistsModule {}
