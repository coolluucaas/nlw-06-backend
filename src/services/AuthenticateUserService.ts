import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { sign, verify } from 'jsonwebtoken'

interface AuthenticateUserRequestInterface {
    email: string
    password: string
}

export interface UserInterface {
    id: string
    username: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: AuthenticateUserRequestInterface) {
        const userRepository = getCustomRepository(UserRepository)

        if (!email) {
            throw new Error('Email is a mandatory field.')
        }

        if (!password) {
            throw new Error('Password is a mandatory')
        }

        const user = await userRepository.findOne({
            email,
        })

        if (!user) {
            throw new Error('Email or password incorrect.')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email or password incorrect.')
        }

        const token = sign({ email: user.email }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d',
        })

        return token
    }
}

export { AuthenticateUserService }
