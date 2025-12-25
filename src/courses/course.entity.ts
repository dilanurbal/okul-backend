import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity()
export class Course {
@PrimaryGeneratedColumn()
id: number;

@Column({ default: 30 })        
capacity: number;

@Column({ default: 0 })        
enrolled: number;

@Column({ nullable: true })    
teacherName: string;

@Column()
name: string;

@Column()
code: string;

@Column()
credit: number;

@OneToMany(() => Enrollment, (enrollment) => enrollment.course)
enrollments: Enrollment[];
}
