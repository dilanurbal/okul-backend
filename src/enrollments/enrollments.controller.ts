import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
export class EnrollmentsController {
constructor(private readonly service: EnrollmentsService) {}

@Post()
create(@Body() body: { userId: number; courseId: number }) {
    return this.service.create(body.userId, body.courseId);
}

@Get()
findAll() {
    return this.service.findAll();
}

@Delete(':id')
remove(@Param('id') id: number) {
    return this.service.delete(Number(id));
}
}
