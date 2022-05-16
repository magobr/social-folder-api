import { Router } from "express";
// Controllers
import { UserController }from "./controller/UserController"

// Midlewares
import multer from "multer";
import { multerConfig } from "./config/multer"
import { ImageService } from "./service/ImageService";

const route = Router();

const User = new UserController;

// Service
const Image = new ImageService;

route.get("/", (req, res)=>{
    res.json({
        Hello: "World"
    });
});

route.post("/user", User.store);
route.get("/user/:user", User.find);

export { route }