import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, PrismaService],
})
export class AuthModule {}