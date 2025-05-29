import { Injectable, NotFoundException } from '@nestjs/common';
import { IArtistRepository } from '../interfaces/artist-repository.interface';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { randomUUID } from 'node:crypto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class MemoryArtistRepository implements IArtistRepository {
  private artists: Artist[] = [];

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findById(id: string): Promise<Artist> {
    if (!this.artists.find((artist) => artist.id === id)) {
      throw new NotFoundException('Artist not found!');
    }

    return this.artists.find((artist) => artist.id === id);
  }

  async create(data: CreateArtistDto): Promise<Artist> {
    const newArtist = {
      id: randomUUID(),
      ...data,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  async update(id: string, data: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findById(id);
    Object.assign(artist, data);

    return artist;
  }

  async delete(id: string): Promise<void> {
    const artist = await this.findById(id);
    this.artists = this.artists.filter((art) => art.id !== artist.id);
  }
}
