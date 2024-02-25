import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as md5 from 'md5';

@Injectable()
export class UserService {
    constructor(private PrismaClient: PrismaService){}
    
    async create (data: UserDTO){
        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                OR:[
                    {
                        email: data.email
                    },
                    {
                        nickname: data.nickname
                    }
                ]
            }
        });

        if (userExists) {
            throw new HttpException({
                error: true,
                message: 'Usuário ja cadastrado (E-mail ou nickname) já utilizado'
            }, HttpStatus.CONFLICT);
        }

        data.password = md5(data.password);
        
        const user = await this.PrismaClient.user.create({data});
        
        return {
            error : false,
            message: 'Usuário cadastrado com sucesso',
            data: {
                id: data.id,
                name: data.name,
                nickname: data.nickname,
                email: data.email
            }
        }
    }

    async find(id: string) {

        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                email: true,
                name: true, 
                nickname: true
            }
        });

        if (!userExists) {
            throw new HttpException({
                error: true,
                message: "Usuario não existe"
            }, HttpStatus.NOT_FOUND)
        }

        return {
            error: false,
            message: 'Usuário encontrado com sucesso',
            data: userExists
        }
    }

    async update(id: string, data: UserDTO){

        if (Object.keys(data).length < 1) throw new HttpException("Requisição sem corpo", HttpStatus.UNPROCESSABLE_ENTITY) 

        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                id: id
            }
        });

        if (!userExists) {
            throw new HttpException({
                error: true,
                message: "Usuario não existe"
            }, HttpStatus.NOT_FOUND);
        }

        
        data.password = md5(data.password);

        return await this.PrismaClient.user.update({
            data,
            where:{
                id: id
            },
            select: {
                id: true,
                name: true,
                email: true,
                nickname: true
            }
        })
    }

    async delete(id: string){
        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                id: id
            }
        });

        if (!userExists) {
            throw new HttpException({
                error: true,
                message: "Usuario não existe"
            }, HttpStatus.NOT_FOUND);
        }

        return this.PrismaClient.user.delete({
            where:{
                id: id
            }
        });

    }
}