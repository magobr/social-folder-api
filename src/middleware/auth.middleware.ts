import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        
        const authUser = req.headers.authorization.split(' ');

        if (!authUser) {
            res.status(401).json({
                error: true,
                message: "Nessesário estar autenticado",
            });
        }
    
        next()
    }
}