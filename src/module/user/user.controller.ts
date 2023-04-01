import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO){
    return this.userService.create(data)
  }

  @Get(":id")
  async find(@Param("id") id:string){
    return this.userService.find(id);
  }

  @Put(":id")
  async update(@Body() data:UserDTO, @Param("id") id:string) {
    return this.userService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id:string) {
    return this.userService.delete(id);
  }
}
