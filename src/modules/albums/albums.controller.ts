import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createTrackDto: CreateAlbumDto) {
    return this.albumsService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.albumsService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateTrackDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidParamDto) {
    return this.albumsService.remove(params.id);
  }
}
