import { Router } from 'express'

import { createTokens, refreshTokens } from './auth.controller'

const router = Router()
// parent path : /auth/jwt


router.post('/login', createTokens)
router.post('/refresh', refreshTokens)


export const jwtRouter = router
