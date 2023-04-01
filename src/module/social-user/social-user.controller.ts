import { Controller, Get, Param } from '@nestjs/common';
import { SocialUserService } from './social-user.service';

@Controller('social-user')
export class SocialUserController {
  constructor(private readonly socialUserService: SocialUserService) {}

  @Get(":nickname")
  async findSocial(@Param("nickname") nickname:string){
    return this.socialUserService.find(nickname);
  }
}
