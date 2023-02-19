import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDecorator } from './decorators/user.decorator';
import { IJwtUser } from './guards/interfaces/jwt-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/ping')
  getHello(): string {
    return this.appService.pong();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@UserDecorator() user: IJwtUser) {
    return user;
  }
}
