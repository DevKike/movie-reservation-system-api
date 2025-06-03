import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IMovie,
  IShowtime,
} from '../../domain/interfaces/entity/movies.entity.interface';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';
import { User } from 'src/lib/users/infrastructure/entity/users.entity';

@Entity('movies')
export class Movie implements IMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'poster_url' })
  posterUrl: string;

  @Column()
  genre: string;

  @Column('json')
  showtimes: IShowtime[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.movies, { eager: true })
  @JoinColumn({ name: 'create_by' })
  createdBy: IUser;
}
