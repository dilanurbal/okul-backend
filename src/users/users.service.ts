// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
) {}

  // Tüm kullanıcıları getir
findAll(): Promise<User[]> {
    return this.userRepository.find();
}

  // ID ile kullanıcı getir
async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
}

  // Email ile kullanıcı getir (login için)
async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
}

  // Yeni kullanıcı oluştur
async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
}

  // Kullanıcıyı güncelle
async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // findOne artık NotFoundException fırlatıyor
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
}

  // Kullanıcıyı sil
async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
}
}
