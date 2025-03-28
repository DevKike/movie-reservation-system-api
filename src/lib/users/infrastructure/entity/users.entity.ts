import { IUser } from '../../domain/interfaces/entity/users.entity.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatus } from '../../domain/enums/user-status.enum';
import { IRole } from 'src/lib/roles/domain/interfaces/roles.entity.interface';
import { Role } from 'src/lib/roles/infrastructure/entity/roles.entity';

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

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: IRole;
}
