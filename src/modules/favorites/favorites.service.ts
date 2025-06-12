import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from '../tracks/entities/track.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favsRepo: Repository<Favorites>,
    @InjectRepository(Track)
    private readonly trackRepo: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepo: Repository<Artist>,
  ) {}

  private async getFavoritesObject() {
    const allRecords = await this.favsRepo.find({
      relations: ['artists', 'tracks', 'albums'],
    });

    if (allRecords.length === 0) {
      const created = this.favsRepo.create({
        artists: [],
        albums: [],
        tracks: [],
      });

      return await this.favsRepo.save(created);
    }

    return allRecords[0];
  }

  async getAll() {
    const favorites = await this.getFavoritesObject();
    return {
      albums: favorites.albums,
      artists: favorites.artists,
      tracks: favorites.tracks,
    };
  }

  async addEntity(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorites = await this.getFavoritesObject();

    if (entityType === 'artist') {
      const artist = await this.artistRepo.findOneBy({ id: id });
      if (!artist) {
        throw new UnprocessableEntityException(
          `Artist with id ${id} doesn't exist!`,
        );
      }

      favorites.artists.push(artist);
    } else if (entityType === 'album') {
      const album = await this.albumRepo.findOneBy({ id: id });
      if (!album) {
        throw new UnprocessableEntityException(
          `Album with id ${id} doesn't exist!`,
        );
      }
      favorites.albums.push(album);
    } else if (entityType === 'track') {
      const track = await this.trackRepo.findOneBy({ id: id });
      if (!track) {
        throw new UnprocessableEntityException(
          `Track with id ${id} doesn't exist!`,
        );
      }
      favorites.tracks.push(track);
    }

    return await this.favsRepo.save(favorites);
  }

  async removeEntity(entityType: 'artist' | 'album' | 'track', id: string) {
    const favorites = await this.getFavoritesObject();

    if (entityType === 'artist') {
      favorites.artists = favorites.artists.filter(
        (artist) => artist.id !== id,
      );
    } else if (entityType === 'album') {
      favorites.albums = favorites.albums.filter((album) => album.id !== id);
    } else if (entityType === 'track') {
      favorites.tracks = favorites.tracks.filter((track) => track.id !== id);
    }

    await this.favsRepo.save(favorites);
  }
}
