import { Module } from '@nestjs/common';
import { SocialUserService } from './social-user.service';
import { SocialUserController } from './social-user.controller';
import { PrismaService } from 'src/database/PrismaService';


@Module({
  controllers: [SocialUserController],
  providers: [SocialUserService, PrismaService]
})
export class SocialUserModule {}
