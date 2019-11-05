import { Router } from 'express'

import { validateIdFormat } from '../../middleware/id.middleware'
import { getById } from './user.middleware'
import {
  createUser,
  getUsersPage,
  getMe,
  updateUser,
  destroyUser,
  getUser
} from './user.controller'


// parent path : /api/0/user
export const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/me', getMe)
// TODO validate payload
userRouter.get('/filter', getUsersPage)

userRouter.use('/:id', validateIdFormat, getById)
userRouter.get('/:id', getUser)
userRouter.put('/:id', updateUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id', destroyUser)
