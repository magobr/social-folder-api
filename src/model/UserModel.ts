import * as mongoose from "mongoose";

import { User } from "../interface/UserInterface";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        frist_name: { type: String, required: true },
        last_name: { type: String, required: true },
        nickname: { type: String, required: true },
        email : { type: String, required: true },
        password : { type: String, required: true }
    },
    { 
        timestamps: true,
    }
)

const UserModel = mongoose.model<User>('user', User)

export { UserModel }