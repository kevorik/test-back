import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'argon2';
import { User } from './user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getById(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
    });
  }

  async getByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'created_at', 'updated_at'], // Добавлено поле password
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    if (!profile) {
      throw new Error('User not found');
    }

    const { password, ...rest } = profile;

    return {
      user: rest,
    };
  }

  async create(dto: UserDto) {
    const user = this.userRepository.create({
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.userRepository.save(user);
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    await this.userRepository.update(id, data);
    return this.userRepository.findOne({
      where: { id },
      select: ['name', 'email', 'created_at', 'updated_at'],
    });
  }
}
