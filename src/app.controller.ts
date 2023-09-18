import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Roles } from './decorators/roles.decorator';
import { UserDecorator } from './decorators/user.decorator';
import { UsersRoleEnum } from './enities/users.entity';
import { IJwtUser } from './guards/interfaces/jwt-user.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  getHello(): string {
    return this.appService.pong();
  }

  @ApiBearerAuth()
  @Roles(UsersRoleEnum.user, UsersRoleEnum.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/jwtdecode')
  async jwtDecode(@UserDecorator() user: IJwtUser) {
    return user;
  }
}
