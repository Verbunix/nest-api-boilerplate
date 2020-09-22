import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninDto } from '../dtos/signin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

    const createdUser = await this.usersService.create({
      ...data,
      password: hashedPassword,
    });

    createdUser.password = undefined;
    return createdUser;
  }

  async validateUser(email: string, hashedPassword: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordMatching = await bcrypt.compare(hashedPassword, user.password);
    if (!isPasswordMatching) {
      return null;
    }

    user.password = undefined;
    return user;
  }

  async login(payload: any) {
    const user = await this.usersService.findOneByEmail(payload.email);

    return {
      access_token: this.jwtService.sign({ ...user, password: undefined }),
    };
  }
}
