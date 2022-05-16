import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

const authConfig =  {
    secret: process.env.AUTH_SECRET,
    expireIn: "6h"
}

export {authConfig};