import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IJwtUser } from './interfaces/jwt-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesClass = this.reflector.get<string[]>('roles', context.getClass());
    const rolesHandler = this.reflector.get<string[]>('roles', context.getHandler());
    const accessRoles = rolesHandler ? rolesHandler : rolesClass;
    if (!accessRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user: IJwtUser = request.user;
    if (!user || !user.role) return false;

    const hasRole = () => !!accessRoles.find((role) => role === user.role);

    return Boolean(hasRole());
  }
}
