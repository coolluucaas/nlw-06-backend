import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(req: Request, res: Response){
        const{ name, email, admin} = req.body;

        const service = new CreateUserService()

        const user = await service.execute({name, email, admin})

        return res.json(user)
    }
}

export { CreateUserController}