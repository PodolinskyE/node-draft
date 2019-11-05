import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser
} from './auth.controller'


// parent path : /auth/jwt
const router = Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', refreshUserToken)
router.post('/logout', logoutUser)

export const jwtRouter = router
