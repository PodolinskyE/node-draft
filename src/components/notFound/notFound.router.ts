import { Router } from 'express'

import {
  notFound
} from './notFound.controller'

const router = Router()

// parent path : /*

router.get('*', notFound)

export const notFoundRouter = router
