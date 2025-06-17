import { Entity, Column, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { numberTransformer } from '../../../common/utils';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VersionColumn()
  version: number;

  @Column({ length: 50 })
  login: string;

  @Column()
  password: string;

  @Column({ type: 'bigint', transformer: numberTransformer })
  createdAt: number;

  @Column({ type: 'bigint', transformer: numberTransformer })
  updatedAt: number;
}
