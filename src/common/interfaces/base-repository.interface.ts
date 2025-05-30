import { BaseEntity } from './base-entity.interface';

export interface Repository<T extends Partial<BaseEntity>> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  create(data: Omit<T, keyof BaseEntity>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T | undefined>;
  delete(id: string): Promise<void>;
}
