import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorite.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../tracks/entities/track.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [TypeOrmModule.forFeature([Favorites, Artist, Album, Track])],
  exports: [FavoritesService],
})
export class FavoritesModule {}
