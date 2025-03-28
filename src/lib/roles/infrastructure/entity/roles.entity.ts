import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IRole } from '../../domain/interfaces/roles.entity.interface';
import { ROLES } from '../../domain/enums/roles.enum';

@Entity({ name: 'roles' })
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ROLES, unique: true })
  name: ROLES;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
