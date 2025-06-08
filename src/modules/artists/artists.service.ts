import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepo.create(createArtistDto);
    const newArtist = await this.artistRepo.save(artist);
    return new ArtistResponseDto(newArtist);
  }

  async findAll() {
    const artists = await this.artistRepo.find();
    return artists.map((artist) => new ArtistResponseDto(artist));
  }

  async findOne(id: string) {
    const artist = await this.artistRepo.findOneBy({ id: id });
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return new ArtistResponseDto(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    await this.artistRepo.update(id, updateArtistDto);
    const updatedArtist = await this.artistRepo.findOneBy({ id: id });
    return new ArtistResponseDto(updatedArtist);
  }

  async remove(id: string) {
    await this.findOne(id);

    // const tracks = await this.trackService.findAll();
    // const connectedTracks = tracks.filter((track) => track.artistId === id);
    // for (const track of connectedTracks) {
    //   await this.trackService.update(track.id, { artistId: null });
    // }

    // const albums = await this.albumService.findAll();
    // const connectedAlbums = albums.filter((album) => album.artistId === id);
    // for (const album of connectedAlbums) {
    //   await this.albumService.update(album.id, { artistId: null });
    // }

    // this.favoriteService.removeEntity('artist', id);

    return this.artistRepo.delete(id);
  }
}
