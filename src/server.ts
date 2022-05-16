import { App } from "./app";

const app = new App;

app.runningServer(3333,()=>{
    console.log('Server rodando')
})