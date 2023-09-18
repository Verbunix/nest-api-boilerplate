import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IJwtUser } from './interfaces/jwt-user.interface';

export type ExeCtx = ExecutionContext & { user?: IJwtUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    if (!req.headers?.authorization) return false;

    req.user = this.validateToken(req.headers.authorization);
    return true;
  }

  validateToken(auth: string): false | IJwtUser {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const jwtSecret = process.env.JWT_SECRET;
      const decoded = <IJwtUser>jwt.verify(token, jwtSecret);
      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
