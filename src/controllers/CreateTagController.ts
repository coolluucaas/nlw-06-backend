import { Request, Response } from 'express'
import { CreateTagService } from '../services/CreateTagService'

class CreateTagController {
    async handle(request: Request, response: Response) {
        const { name } = request.body

        const service = new CreateTagService()

        const result = await service.execute({ name })

        return response.json({ result })
    }
}

export { CreateTagController }
