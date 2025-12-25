import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
constructor(private readonly usersService: UsersService) {}

@Get()
findAll(): Promise<User[]> {
    return this.usersService.findAll();
}

@Post()
create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
}

@Put(':id')
update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, body);
}

@Delete(':id')
remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
}
}
