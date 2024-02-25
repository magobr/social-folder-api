import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { SocialFolderDTO } from './social-folder.dto';

@Injectable()
export class SocialFolderService {
    constructor(private PrismaClient: PrismaService){}

    async create(data: SocialFolderDTO) {
        const socialMidia = this.PrismaClient.sociaMidia.create({data});

        return socialMidia
    }

    async find (userId:string) {
        const userMidiaExists = await this.PrismaClient.sociaMidia.findMany({
            where :{
                userId: userId
            }
        });

        if (userMidiaExists.length === 0) {
            throw new HttpException({
                error: true,
                message: "Sem midias sociais"
            }, HttpStatus.NOT_FOUND)
        }

        return userMidiaExists
    }

    async update(id: string, data: SocialFolderDTO){
        const socialExists = await this.PrismaClient.sociaMidia.findUnique({
            where: {
                id
            }
        })

        if (!socialExists) {
            throw new HttpException({
                error: true,
                message: "Midia social não existe"
            }, HttpStatus.NOT_FOUND);
        }

        return await this.PrismaClient.sociaMidia.update({
            data,
            where:{
                id
            }
        })
    }

    async delete(id: string){
        const socialExists = await this.PrismaClient.sociaMidia.findUnique({
            where: {
                id
            }
        })

        if (!socialExists) {
            throw new HttpException({
                error: true,
                message: "Midia social não existe"
            }, HttpStatus.NOT_FOUND);
        }

        return await this.PrismaClient.sociaMidia.delete({
            where:{
                id
            }
        })
    }
}
