import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Album } from './entities/album.entity';
import { AlbumResponseDto } from './dto/album-response.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject('AlbumRepository')
    private readonly albumRepo: MemoryRepository<Album>,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepo.create(createAlbumDto);
    return new AlbumResponseDto(album);
  }

  async findAll() {
    const albums = await this.albumRepo.findAll();
    return albums.map((album) => new AlbumResponseDto(album));
  }

  async findOne(id: string) {
    const album = await this.albumRepo.findById(id);
    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    return new AlbumResponseDto(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    const updatedAlbum = await this.albumRepo.update(id, updateAlbumDto);

    return new AlbumResponseDto(updatedAlbum);
  }

  async remove(id: string) {
    await this.findOne(id);

    const tracks = await this.trackService.findAll();
    const connectedTracks = tracks.filter((track) => track.albumId === id);
    for (const track of connectedTracks) {
      await this.trackService.update(track.id, { albumId: null });
    }
    return this.albumRepo.delete(id);
  }
}
