import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SocialFolderService } from './social-folder.service';
import { SocialFolderController } from './social-folder.controller';
import { PrismaService } from 'src/database/PrismaService';
import  { SimpleLoggerMiddleware } from '../../middleware/logger.middleware'

@Module({
  controllers: [SocialFolderController],
  providers: [SocialFolderService, PrismaService]
})
export class SocialFolderModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(SimpleLoggerMiddleware).forRoutes('social-folder')
  }
}
