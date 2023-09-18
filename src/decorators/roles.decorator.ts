import { SetMetadata } from '@nestjs/common';
import { UsersRoleEnum } from '../enities/users.entity';

export const Roles = (...roles: UsersRoleEnum[]) => SetMetadata('roles', roles);
