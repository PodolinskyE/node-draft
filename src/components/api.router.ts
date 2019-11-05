import { Router } from 'express'

import { userRouter } from './user/user.router'


export const apiRouter = Router()

apiRouter.use('/user', userRouter)
