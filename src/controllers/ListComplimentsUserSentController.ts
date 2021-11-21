import { Request, Response } from 'express'
import { ListComplimentsUserSentService } from '../services/ListComplimentsUserSentService'

class ListComplimentsUserSentController {
    async handle(request: Request, response: Response) {
        const { user_id } = request

        const service = new ListComplimentsUserSentService()
        const compliments = service.execute(user_id)

        return response.status(200).json(compliments)
    }
}

export { ListComplimentsUserSentController }
