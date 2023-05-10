import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutoMiddleware implements NestMiddleware{
    constructor(
        private jwtService: JwtService
    ){}

    use(req: Request, res: Response, next: NextFunction) {
        
        if (!req.headers.authorization) {
            return res.status(403).json({
                error: true,
                message: "Nessesário estar autenticado"
            });
        }

        const auto = req.headers.authorization.split(' ');
        
        const user = this.jwtService.decode(auto[1]);

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "Não autorizado"
            });
        }
    
        next()
    }
}