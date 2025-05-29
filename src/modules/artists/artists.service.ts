import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistRepository } from './interfaces/artist-repository.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository') private readonly artistRepo: IArtistRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistRepo.create(createArtistDto);
    return {
      message: 'Artist is successfully created!',
      artist: newArtist,
    };
  }

  findAll() {
    return this.artistRepo.findAll();
  }

  findOne(id: string) {
    return this.artistRepo.findById(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = await this.artistRepo.update(id, updateArtistDto);
    return {
      message: 'Artist is successfully updated!',
      artist: updatedArtist,
    };
  }

  remove(id: string) {
    return this.artistRepo.delete(id);
  }
}
