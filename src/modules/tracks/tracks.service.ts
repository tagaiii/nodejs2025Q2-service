import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackResponseDto } from './dto/track-response.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track) private readonly trackRepo: Repository<Track>,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoriteService: FavoritesService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = this.trackRepo.create(createTrackDto);
    const newTrack = await this.trackRepo.save(track);
    return new TrackResponseDto(newTrack);
  }

  async findAll() {
    const tracks = await this.trackRepo.find();
    return tracks.map((track) => new TrackResponseDto(track));
  }

  async findOne(id: string) {
    const track = await this.trackRepo.findOneBy({ id: id });
    if (!track) {
      throw new NotFoundException('Track not found!');
    }

    return new TrackResponseDto(track);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    await this.trackRepo.update(id, updateTrackDto);
    const updatedTrack = await this.trackRepo.findOneBy({ id: id });

    return new TrackResponseDto(updatedTrack);
  }

  async remove(id: string) {
    await this.findOne(id);

    this.favoriteService.removeEntity('track', id);
    return this.trackRepo.delete(id);
  }
}
