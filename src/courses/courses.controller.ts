import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Post()
  create(@Body() body: { // Direk interface kullan
    name: string;
    code: string;
    credit: number;
    capacity?: number;
    teacherName?: string;
  }): Promise<Course> {
    return this.coursesService.create(body);
  }
  // TEST için geçici endpoint
@Post('test')
testCreate(@Body() data: any) {
  console.log('TEST: Ders ekleme çağrıldı', data);
  return {
    message: 'Ders test başarılı!',
    data: data,
    timestamp: new Date()
  };
}

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Course>): Promise<Course> {
    return this.coursesService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(+id);
  }

  @Post(':id/enroll')
  enroll(@Param('id') id: string): Promise<Course> {
    return this.coursesService.enroll(+id);
  }

  @Delete(':id/enroll')
  unenroll(@Param('id') id: string): Promise<Course> {
    return this.coursesService.unenroll(+id);
  }

  @Get('my')
  getMyCourses(): Promise<Course[]> {
    return this.coursesService.getMyCourses();
  }
}