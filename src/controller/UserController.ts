import * as express from 'express';
import * as yup from "yup";
import * as bcrypt from "bcryptjs";

import { UserModel } from "../model/UserModel";
import { User } from "../interface/UserInterface";

interface Request extends express.Request {
  user?: any
}
 
class UserController {
  async store(req: Request, res: express.Response, next: express.NextFunction) {

    let schema = yup.object().shape({
        last_name: yup.string().required(),
        frist_name: yup.string().required(),
        nickname: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({
        error: true,
        message: "Dados inválidos"
      })
    }

    let userExist = await UserModel.findOne({ email: req.body.email });
    if(userExist) {
      return res.status(226).json({
        error: true,
        message: "This user already exists!"
      })
    }
    
    let { frist_name, last_name, nickname, email, password } = req.body;

    password = await bcrypt.hash(password.toString(), 8);

    const userData: User = {
      frist_name,
      last_name,
      nickname,
      email,
      password,
    }

    UserModel.create(userData, (err) => {
      if(err) return res.status(400).json({
        error: true,
        message: "Erro ao tentar inserir usuário no MongoDB"
      })

      return res.status(200).json({
        error: false,
        message: "Usuário Cadastrado com sucesso"
      })
    })
  }

  async find(req: Request, res: express.Response, next: express.NextFunction){

    let users;
    
    try{
      if (!req.params.user) {
        users = await UserModel.find({});  
      } else {
        users = await UserModel.findOne({nickname: req.params.user});
      }
    }catch(_e){
      users = false;
    }
    
    if(!users){
      return res.status(200).json({
        error: true,
        message: "No Records!"
      });
    }

    return res.status(200).json(users);
  }

  async del(req: Request, res: express.Response, next: express.NextFunction){
    const userId = req.params.id;
    const loggedUser =  req.user;

    if (loggedUser._id === userId) {
      return res.status(200).json({
        error: true,
        message: "can't be excluded"
      });
    }
    
    let result = await UserModel.findOneAndRemove({_id: userId});

    if(!result){
      return res.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return res.status(200).json({
      error: false,
      message: "User removed successfully!",
      result: result
    });
  }

  async update(req: Request, res: express.Response, next: express.NextFunction){
    const _id = req.params.id;
    let { frist_name, last_name, nickname, email, password} = req.body;

    password = await bcrypt.hash(password.toString(), 8);

    const userData: User = {
      frist_name,
      last_name,
      nickname,
      email,
      password,
    }

    let result = await UserModel.findOneAndReplace({_id: _id}, userData);

    if(!result){
      return res.status(404).json({
        error: true,
        message: "The user does not exist"
      });
    }

    return res.status(200).json({
      error: false,
      message: "User updated successfully!",
      result: result
    });
  }

}

export { UserController }