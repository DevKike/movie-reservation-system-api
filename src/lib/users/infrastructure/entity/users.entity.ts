import { IUser } from '../../domain/interfaces/entity/users.entity.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersStatus } from '../../domain/enums/users-status.enum';
import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { Movies } from 'src/lib/movies/infrastructure/entity/movies.entity';
import { IMovies } from 'src/lib/movies/domain/interfaces/entity/movies.entity.interface';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'phone_number', length: 15, unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'enum', enum: UsersStatus, default: UsersStatus.INACTIVE })
  status: UsersStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: IRole;

  @OneToMany(() => Movies, (movie) => movie.createdBy)
  movies: IMovies[];
}
