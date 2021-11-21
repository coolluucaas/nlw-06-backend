import { getCustomRepository } from 'typeorm'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

class ListComplimentsUserSentService {
    async execute(user_id: string) {
        const complimentRepository = getCustomRepository(ComplimentRepository)

        const compliments = await complimentRepository.find({
            where: {
                user_sender: user_id,
            },
        })

        if (!compliments) {
            throw new Error('User sent no compliments.')
        }

        return compliments
    }
}

export { ListComplimentsUserSentService }
