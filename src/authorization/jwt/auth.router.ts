import { Router } from 'express'

import {
  registerUser,
  loginUser
} from './auth.controller'

const router = Router()
// parent path : /auth/jwt

router.post('/register', registerUser)
router.post('/login', loginUser)

export const jwtRouter = router
