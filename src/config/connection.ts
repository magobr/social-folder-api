import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

class Database{
    constructor() {
        this.mongoCreateConn();
    }

    async mongoCreateConn(){
        await connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log("Connection is ready");
        }).catch((error)=>{
            console.log(`Error: ${error}`);
        })
    }
}

export = new Database();