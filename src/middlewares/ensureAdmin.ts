import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const userRepository = getCustomRepository(UserRepository)
    const { user_id } = request

    const { admin } = await userRepository.findOne({ id: user_id })

    if (!admin) {
        return response.status(401).json({
            error: 'Unauthorized',
        })
    }
    return next()
}
