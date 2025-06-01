import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async getAll() {
    return this.favoritesService.getAll();
  }

  @Post('artist/:id')
  async addArtist(@Param() params: UuidParamDto) {
    return this.favoritesService.addEntity('artist', params.id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param() params: UuidParamDto) {
    return this.favoritesService.removeEntity('artist', params.id);
  }

  @Post('album/:id')
  async addAlbum(@Param() params: UuidParamDto) {
    return this.favoritesService.addEntity('album', params.id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param() params: UuidParamDto) {
    return this.favoritesService.removeEntity('album', params.id);
  }

  @Post('track/:id')
  async addTrack(@Param() params: UuidParamDto) {
    return this.favoritesService.addEntity('track', params.id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param() params: UuidParamDto) {
    return this.favoritesService.removeEntity('track', params.id);
  }
}
