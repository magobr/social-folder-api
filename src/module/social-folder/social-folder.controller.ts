import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SocialFolderService } from './social-folder.service';
import { SocialFolderDTO } from './social-folder.dto';

@Controller('social-folder')
export class SocialFolderController {
  constructor(private readonly socialFolderService: SocialFolderService) {}

  @Post()
  async create (@Body() data: SocialFolderDTO){
    return this.socialFolderService.create(data);
  }

  @Get(":id")
  async find (@Param("id") userId:string) {
    return this.socialFolderService.find(userId);
  }

  @Put(":id")
  async update(@Param("id") id:string, @Body() data:SocialFolderDTO){
    return this.socialFolderService.update(id, data);
  }
  
  @Delete(":id")
  async delete( @Param("id") id:string){
    return this.socialFolderService.delete(id)
  }
}
