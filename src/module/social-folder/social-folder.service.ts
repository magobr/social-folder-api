import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { SocialFolderDTO } from './social-folder.dto';

@Injectable()
export class SocialFolderService {
    constructor(private PrismaClient: PrismaService){}

    async create(data: SocialFolderDTO) {
        const midiaExists = await this.PrismaClient.sociaMidia.findFirst({
            where: {
                link: data.link,
                userId: data.userId,
            }
        });

        if (midiaExists) {
            throw new Error("Midia already exists");
        }

        const socialMidia = this.PrismaClient.sociaMidia.create({data});

        return socialMidia
    }

    async find (userId:string) {
        return this.PrismaClient.sociaMidia.findMany({
            where :{
                userId: userId
            }
        })
    }

    async update(id: string, data: SocialFolderDTO){
        const socialExists = await this.PrismaClient.sociaMidia.findUnique({
            where: {
                id
            }
        })

        if (!socialExists) {
            throw new Error("Social is not exists")
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
            throw new Error("Social is not exists")
        }

        return await this.PrismaClient.sociaMidia.delete({
            where:{
                id
            }
        })
    }
}
