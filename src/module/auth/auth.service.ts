import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class AppService {
  constructor(private PrismaClient: PrismaService){}

  async googleLogin(req) {
    
    if (!req.user) {
      return 'No user from google';
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
      return {
        message: 'User information from google',
        google: {
          user: req.user
        },
        app:{
          user: userExists
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

    if (user) {
      return {
        google: {
          user: req.user
        },
        app: {
          error : false,
          message: 'Usuário cadastrado com sucesso',
          data: {
              id: user.id,
              name: user.name,
              nickname: user.nickname,
              email: user.email
          }
        }
      };
    }
  }
}