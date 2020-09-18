import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from 'src/dtos/signin.dto';
import { LoginDto } from '../dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() body: LoginDto): Promise<any> {
    return body;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto): Promise<any> {
    return body;
  }
}
