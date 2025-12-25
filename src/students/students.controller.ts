import { Controller, Post, Body, Get } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
constructor(private studentsService: StudentsService) {}

@Post()
create(@Body() body) {
    return this.studentsService.create(body);
}

@Get()
findAll() {
    return this.studentsService.findAll();
}
}
