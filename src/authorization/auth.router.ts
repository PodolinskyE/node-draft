import { Router } from 'express'

import { jwtRouter } from './jwt/jwt.router'


export const authRouter = Router()

authRouter.use('/jwt', jwtRouter)
