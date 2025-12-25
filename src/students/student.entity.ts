import {
Entity,
PrimaryGeneratedColumn,
Column,
OneToOne,
JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Student {
@PrimaryGeneratedColumn()
id: number;

@Column()
studentNumber: string;

@OneToOne(() => User, { onDelete: 'CASCADE' })
@JoinColumn()
user: User;
}
