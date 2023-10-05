import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SocialUserService {
    constructor(private PrismaClient: PrismaService){}

    async find(nickname:string){
        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                nickname: nickname
            },
            select:{
                id: true,
                email: true,
                nickname: true,
                name: true,
                socialMidia: true
            },
            
        });

        if (!userExists) {
            throw new HttpException({
                error: true,
                message: "Usuario não existe"
            }, HttpStatus.NOT_FOUND);   
        }

        return {
            error: false,
            message: 'Usuário encontrado com sucesso',
            data: userExists
        }
    }
}
