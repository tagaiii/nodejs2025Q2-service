import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    {
      provide: 'AlbumRepository',
      useClass: MemoryRepository,
    },
  ],
  imports: [forwardRef(() => TracksModule)],
  exports: [AlbumsService],
})
export class AlbumsModule {}
