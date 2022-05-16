import * as express from 'express';
import { ImageModel } from "../model/ImageModel";

interface Request extends express.Request {
    iamge?: any
}

class ImageService {
    async store (req: express.Request, res: express.Response, next: express.NextFunction) {
        const {key, originalname, size, location} = req.file;
        const image = {key, originalname, size, location}

        console.log(req.file)

        ImageModel.create(image, (err: any)=>{
            if(err) return res.status(400).json({
                error: true,
                message: "Erro ao salvar imagem"
            })

            return res.status(200).json({
                error: false,
                message: "Imagen Salva com sucesso"
            })
        })
    }
    
    async find (req: Request, res: express.Response, next: express.NextFunction) {
        let image;
        
        try{
            if (!req.params.id) {
                image = await ImageModel.find({});  
            } else {
                image = await ImageModel.findById(req.params.id);
            }
        } catch (_e){
            image = false;
        }

        if(!image){
            return res.status(200).json({
                error: true,
                message: "No Records!"
            });
        }
            
        return res.status(200).json(image);
    }
}

export { ImageService }