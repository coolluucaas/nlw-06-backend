import { Request, Response } from 'express'
import { ListComplimentsUserReceivedService } from '../services/ListComplimentsUserReceivedService'

class ListComplimentsUserReceivedController {
    async handle(request: Request, response: Response) {
        const { user_id } = request

        const service = new ListComplimentsUserReceivedService()
        const compliments = await service.execute(user_id)

        return response.json(compliments)
    }
}

export { ListComplimentsUserReceivedController }
