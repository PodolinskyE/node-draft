import { Router } from 'express'

import {
  registerUser,
  loginUser,
  refreshUserToken,
  logoutUser
} from './auth.controller'


// parent path : /auth/jwt
export const jwtRouter = Router()

jwtRouter.post('/register', registerUser)
jwtRouter.post('/login', loginUser)
jwtRouter.post('/refresh', refreshUserToken)
jwtRouter.post('/logout', logoutUser)
