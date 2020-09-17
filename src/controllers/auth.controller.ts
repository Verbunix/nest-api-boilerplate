import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from 'src/dtos/signin.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginDto): Promise<any> {
    return body;
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto): Promise<any> {
    return body;
  }
}
