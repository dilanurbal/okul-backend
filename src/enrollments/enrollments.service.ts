import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';

@Injectable()
export class EnrollmentsService {
constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
) {}

async create(userId: number, courseId: number) {
    const student = await this.userRepo.findOne({
    where: { id: userId },
    });

    if (!student) {
    throw new Error('User bulunamadı');
    }

    const course = await this.courseRepo.findOne({
    where: { id: courseId },
    });

    if (!course) {
    throw new Error('Course bulunamadı');
    }

    const enrollment = this.enrollmentRepo.create({
    student,
    course,
    });

    return this.enrollmentRepo.save(enrollment);
}

findAll() {
    return this.enrollmentRepo.find();
}

delete(id: number) {
    return this.enrollmentRepo.delete(id);
}
}
