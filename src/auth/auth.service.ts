import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SigninDto } from './dtos/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signinUser(data: SigninDto) {
    const user = await this.usersService.findOneByEmail(data.email);
    if (user) {
      throw new BadRequestException(`User ${data.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdUser = await this.usersService.createUser({
      password: hashedPassword,
      email: data.email,
      name: data.name,
    });

    createdUser.password = undefined;
    return createdUser;
  }

  async validateUser(email: string, hashedPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const isPasswordMatching = await bcrypt.compare(hashedPassword, user.password);
    if (!isPasswordMatching) return null;

    user.password = undefined;
    return user;
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.findOneByEmail(payload.email);

    return {
      access_token: this.jwtService.sign({...user, password: undefined}),
    };
  }
}
