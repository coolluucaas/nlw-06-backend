import { Request, Response } from 'express'
import { CreateComplimentService } from '../services/CreateComplimentService'

class CreateComplimentController {
    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, message } = request.body
        const {user_id} = request

        const service = new CreateComplimentService()
        const result = await service.execute({
            tag_id,
            user_sender: user_id,
            user_receiver,
            message,
        })

        return response.json({ result })
    }
}

export { CreateComplimentController }
