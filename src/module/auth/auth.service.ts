import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';

import { PrismaService } from 'src/database/PrismaService';
import { appLoginDto } from './auth.dto';

@Injectable()
export class AppService {
  constructor(
    private PrismaClient: PrismaService,
    private jwtService: JwtService,
  ) {}

  async appLogin(data: appLoginDto) {
    let responseData = true;
    const messageResponseData: any = {};

    if (!data.email) {
      messageResponseData.email = 'Campo email obrigatório';
      responseData = false;
    }

    if (!data.password) {
      messageResponseData.password = 'Campo password obrigatório';
      responseData = false;
    }

    if (!responseData) {
      throw new HttpException({
        error: true,
        message: messageResponseData,
      }, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const emailExists = await this.PrismaClient.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!emailExists) {
      throw new HttpException({
        error: true,
        message: 'Usuário não cadastrado'
      }, HttpStatus.NOT_FOUND);
    }

    const userExists = await this.PrismaClient.user.findFirst({
      where: {
        email: data.email,
        password: md5(data.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        nickname: true,
      },
    });

    if (!userExists) {
      throw new HttpException({
        error: true,
        message: 'Email ou senha inválidos'
      }, HttpStatus.NOT_FOUND);
    }

    const userInfoToken = await this.jwtService.signAsync(userExists);

    return {
      error: false,
      message: 'Usuário logado com sucesso',
      token: userInfoToken,
    };
  }
  
  async decodeUser(data: string) {
    return this.jwtService.decode(data);
  }
}
