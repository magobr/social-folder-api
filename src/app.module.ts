import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { SocialFolderModule } from './module/social-folder/social-folder.module';

@Module({
  imports: [UserModule, SocialFolderModule],
})
export class AppModule {}
