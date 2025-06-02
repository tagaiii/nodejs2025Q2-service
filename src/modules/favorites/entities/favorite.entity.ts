import { BaseEntity } from 'src/common/interfaces/base-entity.interface';

export class Favorites implements BaseEntity {
  id: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  artists: string[];
  albums: string[];
  tracks: string[];
}
