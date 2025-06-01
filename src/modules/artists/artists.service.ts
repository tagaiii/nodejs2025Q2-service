import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Artist } from './entities/artist.entity';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepo: MemoryRepository<Artist>,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.artistRepo.create(createArtistDto);
    return new ArtistResponseDto(artist);
  }

  async findAll() {
    const artists = await this.artistRepo.findAll();
    return artists.map((artist) => new ArtistResponseDto(artist));
  }

  async findOne(id: string) {
    const artist = await this.artistRepo.findById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return new ArtistResponseDto(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    const updatedArtist = await this.artistRepo.update(id, updateArtistDto);
    return new ArtistResponseDto(updatedArtist);
  }

  async remove(id: string) {
    await this.findOne(id);

    const tracks = await this.trackService.findAll();
    const connectedTracks = tracks.filter((track) => track.artistId === id);
    for (const track of connectedTracks) {
      await this.trackService.update(track.id, { artistId: null });
    }

    const albums = await this.albumService.findAll();
    const connectedAlbums = albums.filter((album) => album.artistId === id);
    for (const album of connectedAlbums) {
      await this.albumService.update(album.id, { artistId: null });
    }

    this.favoriteService.removeEntity('artist', id);

    return this.artistRepo.delete(id);
  }
}
