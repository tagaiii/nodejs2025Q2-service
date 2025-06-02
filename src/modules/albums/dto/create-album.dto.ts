import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @IsPositive()
  year: number;
}
