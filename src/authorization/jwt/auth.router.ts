import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshUserToken
} from './auth.controller'

const router = Router()
// parent path : /auth/jwt

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', refreshUserToken)

export const jwtRouter = router
