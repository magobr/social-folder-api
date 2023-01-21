import { Body, Controller, Post } from '@nestjs/common';
import { SocialFolderService } from './social-folder.service';
import { SocialFolderDTO } from './social-folder.dto';

@Controller('social-folder')
export class SocialFolderController {
  constructor(private readonly socialFolderService: SocialFolderService) {}

  @Post()
  async create (@Body() data: SocialFolderDTO){
    return this.socialFolderService.create(data)
  }
}
