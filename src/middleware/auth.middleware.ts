import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { PrismaService } from 'src/database/PrismaService';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(
        private PrismaClient: PrismaService,
        private jwtService: JwtService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        
        const authUser = req.cookies['SOCIAL_USER'];

        if (!authUser) {
            res.status(401).json({
                error: true,
                message: "Nessesário estar autenticado",
            });
        }

        const decoded_user:any = this.jwtService.decode(authUser);

        if (!decoded_user) {
            res.status(401).json({
                error: true,
                message: "Nessesário estar autenticado",
            });
        }

        const userExists = await this.PrismaClient.user.findUnique({
            where:{
                id: decoded_user.id
            }
        })

        if (!userExists) {
            res.status(401).json({
                error: true,
                message: "Nessesário estar autenticado",
            });
        }
    
        next()
    }
}