import { randomUUID } from 'node:crypto';
import { BaseEntity } from '../interfaces/base-entity.interface';
import { Repository } from '../interfaces/base-repository.interface';

export class MemoryRepository<T extends Partial<BaseEntity>>
  implements Repository<T>
{
  private entities: T[] = [];

  async findAll(): Promise<T[]> {
    return this.entities;
  }

  async findById(id: string): Promise<T | undefined> {
    return this.entities.find((entity) => entity.id === id);
  }

  async create(data: Omit<T, keyof BaseEntity>): Promise<T> {
    const newEntity = {
      ...data,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.entities.push(newEntity as T);

    return newEntity as T;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const entity = await this.findById(id);
    if (entity) {
      Object.assign(entity, {
        ...data,
        version: entity.version + 1,
        updatedAt: Date.now(),
      });
    }

    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findById(id);
    this.entities = this.entities.filter((ent) => ent.id !== entity?.id);
  }
}
