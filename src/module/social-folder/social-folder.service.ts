import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { SocialFolderDTO } from './social-folder.dto';

@Injectable()
export class SocialFolderService {
    constructor(private PrismaClient: PrismaService){}

    async create(data: SocialFolderDTO) {
        const midiaExists = await this.PrismaClient.sociaMidia.findFirst({
            where: {
                nickname: data.nickname
            }
        });

        if (midiaExists) {
            throw new Error("User already exists");
        }

        const socialMidia = this.PrismaClient.sociaMidia.create({data});

        return socialMidia
    }
}
