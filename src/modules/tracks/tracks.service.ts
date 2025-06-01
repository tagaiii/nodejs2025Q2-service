import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Track } from './entities/track.entity';
import { TrackResponseDto } from './dto/track-response.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepo: MemoryRepository<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepo.create(createTrackDto);
    return new TrackResponseDto(track);
  }

  async findAll() {
    const tracks = await this.trackRepo.findAll();
    return tracks.map((track) => new TrackResponseDto(track));
  }

  async findOne(id: string) {
    const track = await this.trackRepo.findById(id);
    if (!track) {
      throw new NotFoundException('Track not found!');
    }

    return new TrackResponseDto(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    const updatedTrack = await this.trackRepo.update(id, updateTrackDto);

    return new TrackResponseDto(updatedTrack);
  }

  async remove(id: string) {
    await this.findOne(id);

    this.favoriteService.removeEntity('track', id);
    return this.trackRepo.delete(id);
  }
}
