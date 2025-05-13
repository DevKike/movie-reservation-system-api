import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAuth } from '../../domain/interfaces/entity/auth.entity.interface';
import { IUser } from 'src/lib/users/domain/interfaces/entity/users.entity.interface';
import { User } from 'src/lib/users/infrastructure/entity/users.entity';
import { Exclude } from 'class-transformer';

@Entity('auth')
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'refresh_token_expires_in', nullable: true })
  refreshTokenExpiresIn: Date;

  @Column({ name: 'last_sign_in', nullable: true })
  lastSignInAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: IUser;
}
