import { Router } from 'express'

import { notFound } from './notFound.controller'


// parent path : /*
const router = Router()

router.get('*', notFound)


export const notFoundRouter = router
