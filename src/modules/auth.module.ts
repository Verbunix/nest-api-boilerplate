import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwtSecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [],
  controllers: [AuthController],
})
export class AuthModule {
}
