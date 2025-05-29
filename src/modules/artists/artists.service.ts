import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtistRepository } from './interfaces/artist-repository.interface';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject('ArtistRepository') private readonly artistRepo: IArtistRepository,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    return this.artistRepo.create(createArtistDto);
  }

  findAll() {
    return this.artistRepo.findAll();
  }

  findOne(id: string) {
    return this.artistRepo.findById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistRepo.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artistRepo.delete(id);
  }
}
