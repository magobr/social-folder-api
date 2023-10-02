import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as md5 from 'md5';
import { Request } from 'express';

@Injectable()
export class UserService {
    constructor(private PrismaClient: PrismaService){}
    
    async create (data: UserDTO){
        const userExists = await this.PrismaClient.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (userExists) {
            throw new Error("User already exists");
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
            throw new Error ("User don't exists")
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
            throw new HttpException("User don't exists", HttpStatus.NOT_FOUND);
        }

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
            throw new Error("User don't exists");
        }

        return this.PrismaClient.user.delete({
            where:{
                id: id
            }
        });

    }
}