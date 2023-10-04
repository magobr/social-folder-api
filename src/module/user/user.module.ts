import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/PrismaService';
import  { AutoMiddleware } from '../../middleware/auto.middleware'
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService]
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AutoMiddleware).exclude({path: 'user', method: RequestMethod.POST}).forRoutes('user')
    consumer.apply(AuthMiddleware).exclude({path: 'user', method: RequestMethod.POST}).forRoutes('user');
  }
}
