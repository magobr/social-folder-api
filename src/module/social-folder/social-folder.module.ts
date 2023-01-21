import { Module } from '@nestjs/common';
import { SocialFolderService } from './social-folder.service';
import { SocialFolderController } from './social-folder.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [SocialFolderController],
  providers: [SocialFolderService, PrismaService]
})
export class SocialFolderModule {}
