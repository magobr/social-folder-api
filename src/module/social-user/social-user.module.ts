import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SocialUserService } from './social-user.service';
import { SocialUserController } from './social-user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { AuthMiddleware } from '../../middleware/auth.middleware';


@Module({
  controllers: [SocialUserController],
  providers: [SocialUserService, PrismaService]
})
export class SocialUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('social-user')
  }
}
