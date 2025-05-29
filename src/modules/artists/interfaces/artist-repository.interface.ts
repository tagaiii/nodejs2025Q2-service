import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';

export interface IArtistRepository {
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist | undefined>;
  create(data: CreateArtistDto): Promise<Artist>;
  update(id: string, data: UpdateArtistDto): Promise<Artist>;
  delete(id: string): Promise<void>;
}
