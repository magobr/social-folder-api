import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AutoMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            return res.status(403).json({
                error: true,
                message: "Token inválido"
            });
        }

        const auto = req.headers.authorization.split(' ');
        
        if (auto[1] !== process.env.AUTH_TOKEN) {
            return res.status(401).json({
                error: true,
                message: "Não autorizado"
            });
        }
    
        next()
    }
}