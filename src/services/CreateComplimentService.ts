import { getCustomRepository } from 'typeorm'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { UserRepository } from '../repositories/UserRepository'

interface CreateComplementRequestInterface {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

class CreateComplimentService {
    async execute({
        tag_id,
        user_sender,
        user_receiver,
        message,
    }: CreateComplementRequestInterface) {
        const complimentRepository = getCustomRepository(ComplimentRepository)
        const userRepository = getCustomRepository(UserRepository)

        if (user_sender === user_receiver) {
            throw new Error('User cannot create a compliment for himself.')
        }

        const userReceiver = await userRepository.findOne({ id: user_receiver })

        if (!userReceiver) {
            throw new Error('User receiver is not valid.')
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message,
        })

        console.log('compliment', compliment)

        await complimentRepository.save(compliment)

        return compliment
    }
}

export { CreateComplimentService }
