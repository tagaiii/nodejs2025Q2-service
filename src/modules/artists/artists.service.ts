import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistRepository } from './interfaces/artist-repository.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository') private readonly artistRepo: IArtistRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepo.create(createArtistDto);
  }

  async findAll() {
    return this.artistRepo.findAll();
  }

  async findOne(id: string) {
    const artist = await this.artistRepo.findById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found!');
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    return this.artistRepo.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.artistRepo.delete(id);
  }
}
