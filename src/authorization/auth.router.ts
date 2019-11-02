import { Router } from 'express'

import { jwtRouter } from './jwt/auth.router'


const router = Router()


router.use('/jwt', jwtRouter)

export const authRouter = router
