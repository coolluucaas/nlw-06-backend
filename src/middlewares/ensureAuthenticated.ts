import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface PayloadInterface {
    email: string
    iat: number
    exp: number
    sub: string
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization

    if (!authToken) {
        throw new Error('Invalid authorization')
    }

    const [, token] = authToken.split(' ')

    const { sub } = <PayloadInterface>verify(token, process.env.JWT_SECRET)
    
    request.user_id = sub

    return next()
}
