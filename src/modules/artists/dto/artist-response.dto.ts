import { Artist } from '../entities/artist.entity';

export class ArtistResponseDto {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: Artist) {
    this.id = artist.id;
    this.name = artist.name;
    this.grammy = artist.grammy;
  }
}
