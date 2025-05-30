import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { MemoryRepository } from 'src/common/memory/memory.repository';
import { Track } from './entities/track.entity';
import { TrackResponseDto } from './dto/track-response.dto';

@Injectable()
export class TracksService {
  constructor(
    @Inject('TrackRepository')
    private readonly trackRepo: MemoryRepository<Track>,
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
    return this.trackRepo.delete(id);
  }
}
