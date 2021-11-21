import { getCustomRepository } from 'typeorm'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

class ListComplimentsUserReceivedService {
    async execute(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository)

        const compliments = complimentRepository.find({
            where: {
                user_receiver: user_id,
            },
        })

        if (!compliments) {
            throw new Error('User received no compliments')
        }

        return compliments
    }
}

export { ListComplimentsUserReceivedService }
