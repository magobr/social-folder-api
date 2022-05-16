import { Document } from "mongoose";

export interface Image extends Document {
    originalname: string,
    size: Number,
    key: string,
    location: string
}