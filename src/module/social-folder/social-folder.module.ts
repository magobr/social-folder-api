import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SocialFolderService } from './social-folder.service';
import { SocialFolderController } from './social-folder.controller';
import { PrismaService } from 'src/database/PrismaService';
import  { AutoMiddleware } from '../../middleware/auto.middleware'

@Module({
  controllers: [SocialFolderController],
  providers: [SocialFolderService, PrismaService]
})
export class SocialFolderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AutoMiddleware).forRoutes('social-folder')
  }
}
