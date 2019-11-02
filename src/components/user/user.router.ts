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
const router = Router()


router.post('/', createUser)
router.get('/me', getMe)
// TODO validate payload
router.get('/filter', getUsersPage)

router.use('/:id', validateIdFormat, getById)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.patch('/:id', updateUser)
router.delete('/:id', destroyUser)


export const userRouter = router
