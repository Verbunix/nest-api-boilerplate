import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users, UsersRoleEnum } from '../../enities/users.entity';
import CreateUserDto from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.create({
      password: dto.password,
      email: dto.email,
      name: dto.name,
      role: UsersRoleEnum.user,
    } satisfies Omit<Users, 'id'>);
    await this.usersRepository.save(user);
    return user;
  }
}
