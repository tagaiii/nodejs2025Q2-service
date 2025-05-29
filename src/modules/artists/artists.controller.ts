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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.artistsService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(params.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidParamDto) {
    return this.artistsService.remove(params.id);
  }
}
