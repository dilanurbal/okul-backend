import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create({
      ...createCourseDto,
      capacity: createCourseDto.capacity || 30,
      enrolled: 0,
      teacherName: createCourseDto.teacherName || 'Öğretmen',
    });
    return this.courseRepository.save(course);
  }

  async update(id: number, body: Partial<Course>): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course bulunamadı');

    Object.assign(course, body);
    return this.courseRepository.save(course);
  }

  async remove(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) throw new NotFoundException('Course bulunamadı');
    await this.courseRepository.remove(course);
  }

  // YENİ EKLENEN METODLAR:

  // Derse kayıt ol
  async enroll(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course bulunamadı');
    
    if (course.enrolled >= course.capacity) {
      throw new Error('Ders kapasitesi dolmuştur');
    }
    
    course.enrolled += 1;
    return this.courseRepository.save(course);
  }

  // Dersten çık
  async unenroll(courseId: number): Promise<Course> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course bulunamadı');
    
    if (course.enrolled > 0) {
      course.enrolled -= 1;
    }
    
    return this.courseRepository.save(course);
  }

  // Kullanıcının kayıt olduğu dersleri getir
  async getMyCourses(): Promise<Course[]> {
    // Burada enrollment tablon varsa ona göre, yoksa test için tüm dersleri döndür
    return this.courseRepository.find({ take: 5 }); // Test için ilk 5 ders
  }
}