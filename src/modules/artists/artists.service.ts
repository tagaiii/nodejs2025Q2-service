import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Artist } from './entities/artist.entity';
import { ArtistResponseDto } from './dto/artist-response.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository')
    private readonly artistRepo: MemoryRepository<Artist>,
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
    return this.artistRepo.delete(id);
  }
}
