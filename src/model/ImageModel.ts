import * as mongoose from "mongoose";

import { Image } from "../interface/ImageInterface";

const Schema = mongoose.Schema;

const Image = new Schema(
    {
        originalname: { type: String, required: true },
        size: { type: Number, required: true },
        key: { type: String, required: true },
        location: { type: String, required: true },
    },
    { 
        timestamps: true,
    }
)

const ImageModel = mongoose.model<Image>('Image', Image)

export { ImageModel }