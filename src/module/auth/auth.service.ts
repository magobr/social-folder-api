import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from 'src/database/PrismaService';
import { appLoginDto } from './auth.dto';

@Injectable()
export class AppService {
  constructor(
    private PrismaClient: PrismaService,
    private jwtService: JwtService
  ){}

  async googleLogin(req: any) {

    let userInfoToken: string = "";
    
    if (!req.user) {
      return {
        error: true,
        message: 'No user from google'
      }
    }

    const userExists = await this.PrismaClient.user.findFirst({
      where: {
        email: req.user.email
      },
      select: {
        id: true,
        name: true,
        email: true,
        nickname: true
      }
    });

    if (userExists) {

      userInfoToken = await this.jwtService.signAsync(userExists);

      return {
        error: false,
        message: "Usuário cadastrado com sucesso",
        google: {
          user: req.user
        },
        app:{
          token: userInfoToken
        }
      };
    }

    const nickname = req.user.email.split('@')
    const data = {
      name: `${req.user.firstName} ${req.user.lastName}`,
      email: req.user.email,
      nickname: nickname[0],
      password: "",
    }

    const user = await this.PrismaClient.user.create({data});

    if (!user) {
      throw new Error('Erro ao cadastrar usuário');
    }

    const dataUser = {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email
  }

    userInfoToken = await this.jwtService.signAsync(dataUser);

    return {
      error: false,
      message: "Usuário cadastrado com sucesso",
      google: {
        user: req.user
      },
      app: {
        error : false,
        message: 'Usuário cadastrado com sucesso',
        token: userInfoToken
      }
    };

  }

  async appLogin(data: appLoginDto){

    let responseData: boolean = true;
    let messageResponseData: any = {};

    if (!data.email) {
      messageResponseData.email = "Campo email obrigatório";
      responseData = false;
    }

    if (!data.password) {
      messageResponseData.password = "Campo password obrigatório";
      responseData = false;
    }

    if(!responseData){
      return {
        error: true,
        message: messageResponseData
      }
    }

    const emailExists = await this.PrismaClient.user.findFirst({
      where:{
        email: data.email
      }
    });

    if (!emailExists) {
      throw new Error('Usuário não cadastrado');
    }

    const userExists = await this.PrismaClient.user.findFirst({
      where: {
        email: data.email,
        password: data.password
      },
      select: {
        id: true,
        name: true,
        email: true,
        nickname: true
      }
    });

    if (!userExists) {
      throw new Error('Email ou senha inválidos');
    }

    const userInfoToken = await this.jwtService.signAsync(userExists)
    
    return {
      error: false,
      message: 'Usuário logado com sucesso',
      token: userInfoToken
    }
    
  }
}