import { Module } from '@nestjs/common';
import { AppController } from './auth.controller';
import { AppService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/PrismaService';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '259200s' },
    })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AuthModule {}
