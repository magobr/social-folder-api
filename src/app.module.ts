import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { SocialFolderModule } from './module/social-folder/social-folder.module';
import { SocialUserModule } from './module/social-user/social-user.module';

// Model Auth
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [UserModule, SocialFolderModule, SocialUserModule, AuthModule],
})
export class AppModule {}
