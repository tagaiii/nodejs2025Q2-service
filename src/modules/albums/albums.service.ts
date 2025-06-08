import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumResponseDto } from './dto/album-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepo: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepo.create(createAlbumDto);
    const newAlbum = await this.albumRepo.save(album);
    return new AlbumResponseDto(newAlbum);
  }

  async findAll() {
    const albums = await this.albumRepo.find();
    return albums.map((album) => new AlbumResponseDto(album));
  }

  async findOne(id: string) {
    const album = await this.albumRepo.findOneBy({ id: id });
    if (!album) {
      throw new NotFoundException('Album not found!');
    }

    return new AlbumResponseDto(album);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    await this.albumRepo.update(id, updateAlbumDto);
    const updatedAlbum = await this.albumRepo.findOneBy({ id: id });

    return new AlbumResponseDto(updatedAlbum);
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.albumRepo.delete(id);
  }
}
