import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Entity()
export class Enrollment {
@PrimaryGeneratedColumn()
id: number;

@ManyToOne(() => User, {

    eager: true,
    onDelete: 'CASCADE',
})
student: User;

@ManyToOne(() => Course, (course) => course.enrollments, {
    eager: true,
    onDelete: 'CASCADE',
})
course: Course;
}
