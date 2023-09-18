import { SetMetadata } from '@nestjs/common';
import { UsersRoleEnum } from '../users/users.entity';

export const Roles = (...roles: UsersRoleEnum[]) => SetMetadata('roles', roles);
