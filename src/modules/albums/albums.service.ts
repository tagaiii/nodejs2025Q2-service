import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumResponseDto } from './dto/album-response.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepo.create(createAlbumDto);
    const newAlbum = await this.albumRepo.save(album);
    return new AlbumResponseDto(newAlbum);
  }

  async findAll() {
    const albums = await this.albumRepo.find();
    return albums.map((album) => new AlbumResponseDto(album));
  }

  async findOne(id: string) {
    const album = await this.albumRepo.findOneBy({ id: id });
    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    return new AlbumResponseDto(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    await this.albumRepo.update(id, updateAlbumDto);
    const updatedAlbum = await this.albumRepo.findOneBy({ id: id });

    return new AlbumResponseDto(updatedAlbum);
  }

  async remove(id: string) {
    await this.findOne(id);

    // const tracks = await this.trackService.findAll();
    // const connectedTracks = tracks.filter((track) => track.albumId === id);
    // for (const track of connectedTracks) {
    //   await this.trackService.update(track.id, { albumId: null });
    // }

    // this.favoriteService.removeEntity('album', id);

    return this.albumRepo.delete(id);
  }
}
