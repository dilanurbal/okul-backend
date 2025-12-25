import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';

@Injectable()
export class StudentsService {
constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
) {}

create(data: Partial<Student>) {
    return this.studentRepo.save(data);
}

findAll() {
    return this.studentRepo.find({ relations: ['user'] });
}
}
