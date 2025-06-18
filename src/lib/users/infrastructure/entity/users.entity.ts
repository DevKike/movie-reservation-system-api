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
import { USER_STATUS } from '../../domain/enums/users-status.enum';
import { IRole } from 'src/lib/roles/domain/interfaces/entity/roles.entity.interface';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';
import { Movie } from 'src/lib/movies/infrastructure/entity/movies.entity';
import { IMovie } from 'src/lib/movies/domain/interfaces/entity/movies.entity.interface';

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

  @Column({ type: 'enum', enum: USER_STATUS, default: USER_STATUS.INACTIVE })
  status: USER_STATUS;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: IRole;

  @OneToMany(() => Movie, (movie) => movie.createdBy)
  movies: IMovie[];
}
