import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Favorites } from './entities/favorite.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject('FavoriteRepository')
    private readonly favsRepo: MemoryRepository<Favorites>,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  private favorites: Favorites | null = null;

  private async getFavoritesObject() {
    if (this.favorites) return this.favorites;

    const allRecords = await this.favsRepo.findAll();
    if (allRecords.length === 0) {
      const created = await this.favsRepo.create({
        artists: [],
        albums: [],
        tracks: [],
      });
      this.favorites = created;
      return this.favorites;
    }

    this.favorites = allRecords[0];
    return this.favorites;
  }

  async getAll() {
    const favorites = await this.getFavoritesObject();

    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistService.findOne(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumService.findOne(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.trackService.findOne(id)),
    );
    return {
      artists,
      albums,
      tracks,
    };
  }

  async addEntity(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorites = await this.getFavoritesObject();

    if (entityType === 'artist') {
      if (!favorites.artists.includes(id)) {
        const artists = await this.artistService.findAll();
        if (!artists.find((artist) => artist.id === id)) {
          throw new UnprocessableEntityException(
            `Artist with id ${id} doesn't exist!`,
          );
        }

        favorites.artists.push(id);
        await this.favsRepo.update(favorites.id, {
          artists: favorites.artists,
        });
      }
    } else if (entityType === 'album') {
      if (!favorites.albums.includes(id)) {
        const albums = await this.albumService.findAll();
        if (!albums.find((album) => album.id === id)) {
          throw new UnprocessableEntityException(
            `Album with id ${id} doesn't exist!`,
          );
        }

        favorites.albums.push(id);
        await this.favsRepo.update(favorites.id, {
          albums: favorites.albums,
        });
      }
    } else if (entityType === 'track') {
      if (!favorites.tracks.includes(id)) {
        const tracks = await this.trackService.findAll();
        if (!tracks.find((track) => track.id === id)) {
          throw new UnprocessableEntityException(
            `Track with id ${id} doesn't exist!`,
          );
        }

        favorites.tracks.push(id);
        await this.favsRepo.update(favorites.id, {
          tracks: favorites.tracks,
        });
      }
    }
    return this.getAll();
  }

  async removeEntity(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorites = await this.getFavoritesObject();

    if (entityType === 'artist') {
      favorites.artists = favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    } else if (entityType === 'album') {
      favorites.albums = favorites.albums.filter((albumId) => albumId !== id);
    } else if (entityType === 'track') {
      favorites.tracks = favorites.tracks.filter((trackId) => trackId !== id);
    }

    await this.favsRepo.update(favorites.id, favorites);
  }
}
