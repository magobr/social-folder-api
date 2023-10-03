import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './auth.service';
import { appLoginDto } from './auth.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async login(
    @Body() data: appLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const retorno = await this.appService.appLogin(data);
    return retorno;
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('USER_INFO', {
      expires: new Date(),
      maxAge: 0,
    });

    return {
      error: false,
      message: 'deslogado com sucesso',
    };
  }

  @Get('decode-user')
  async decodeUser(@Req() request: Request) {
    if (request.cookies['SOCIAL_USER']) {
      return await this.appService.decodeUser(request.cookies['SOCIAL_USER']);
    } else {
      return {
        error: true,
        message: 'Erro ao decodar jwt',
      };
    }
  }
}
