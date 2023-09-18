import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersRoleEnum } from './users.entity';

@ApiTags('users')
@ApiBearerAuth()
@Roles(UsersRoleEnum.admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {}
