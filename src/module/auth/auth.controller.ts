import { GoogleOAuthGuard } from './google-oauth.guard';
import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express'
import { AppService } from './auth.service';
import { appLoginDto } from './auth.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Res({ passthrough: true }) res: Response) {
    const retorno = await this.appService.googleLogin(req);
    return retorno
  }

  @Post()
  async login(@Body() data: appLoginDto, @Res({ passthrough: true }) res: Response){
    const retorno = await this.appService.appLogin(data);
    return retorno
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response){
  
    res.clearCookie('USER_INFO',{
      expires: new Date(),
      maxAge: 0
    });
    
    return {
      error: false,
      message: "deslogado com sucesso"
    }
  }
}