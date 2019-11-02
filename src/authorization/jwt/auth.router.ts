import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshUserToken
} from './auth.controller'


// parent path : /auth/jwt
const router = Router()


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', refreshUserToken)


export const jwtRouter = router
