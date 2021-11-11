import { UserRepository } from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'

interface UserRequestInterface {
    name: string
    email: string
    admin?: boolean
    password: string
}

class CreateUserService {
    async execute({
        name,
        email,
        admin = false,
        password,
    }: UserRequestInterface) {
        const userRepository = getCustomRepository(UserRepository)

        if (!email) {
            throw new Error('Email is a mandatory field.')
        }

        const userAlreadyExists = await userRepository.findOne({
            email,
        })

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const passwordEncrypted = await hash(password, 8)

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordEncrypted,
        })

        await userRepository.save(user)

        return user
    }
}

export { CreateUserService }
