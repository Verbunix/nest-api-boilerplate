import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from '../ormconfig';
import { UsersModule } from './users.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
