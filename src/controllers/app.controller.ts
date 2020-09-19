import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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
  getProfile(@Request() req) {
    return req.user;
  }
}
