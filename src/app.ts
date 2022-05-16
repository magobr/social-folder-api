// import 'reflect-metadata';
import express from 'express';
import cors from "cors";
require("./config/connection");
// import createConnection from './database';
import { route } from './routes'; 

// createConnection();
const app = express();
class App {
    constructor() {
        this.middlewares();
        this.routes();
    }
    
    middlewares(){
        app.use(express.json());
        
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        })
        app.use(cors());
    }

    routes(){
        app.use(route);
    }

    runningServer(port: number, callback: Function){
        app.listen(process.env.PORT || port, callback());
    }

}

// app.use(router);

export { App }