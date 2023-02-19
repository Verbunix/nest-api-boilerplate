import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from './dtos/signin.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ISigninResponse } from './interfaces/signin.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('/signin')
  async signin(@Body() body: SigninDto): Promise<ISigninResponse> {
    return this.authService.signinUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginDto): Promise<any> {
    return this.authService.login(body);
  }
}