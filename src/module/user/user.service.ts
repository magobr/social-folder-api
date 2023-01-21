import { Injectable } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { PrismaService } from 'src/database/PrismaService';
import * as md5 from 'md5';

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
                nameUser: data.name,
                email: data.email
            }
        }
    }
}
