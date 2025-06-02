import { Track } from '../entities/track.entity';

export class TrackResponseDto {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(track: Track) {
    this.id = track.id;
    this.name = track.name;
    this.artistId = track.artistId;
    this.albumId = track.albumId;
    this.duration = track.duration;
  }
}
