import { Album } from '../entities/album.entity';

export class AlbumResponseDto {
  id: string;
  name: string;
  artistId: string | null;
  year: number;

  constructor(album: Album) {
    this.id = album.id;
    this.name = album.name;
    this.artistId = album.artistId;
    this.year = album.year;
  }
}
