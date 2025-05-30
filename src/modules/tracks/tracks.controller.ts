import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.tracksService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.tracksService.update(params.id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.tracksService.remove(params.id);
  }
}
