import { Router } from 'express'

import { notFound } from './notFound.controller'


// parent path : /*
export const notFoundRouter = Router()

notFoundRouter.get('*', notFound)
