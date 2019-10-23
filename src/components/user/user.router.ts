import { Router } from 'express'

import { validateIdFormat } from '../../middleware/id.middleware'
import { getById } from './user.middleware'


import {
  createUser,
  updateUser,
  destroyUser,
  getUser
} from './user.controller'


const router = Router()
// parent path : /api/0/user


router.post('/', createUser)

router.use('/:id', validateIdFormat, getById)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.patch('/:id', updateUser)
router.delete('/:id', destroyUser)

export const userRouter = router
