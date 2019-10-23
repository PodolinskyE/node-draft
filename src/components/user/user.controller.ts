import { Request, Response, NextFunction } from 'express'
import { User } from '../../entities/user'
import {
  createUser as serviceCreateUser,
  updateUser as serviceUpdateUser,
  destroyUser as servicedestroyUser
} from './user.service'


export async function createUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const payload = <User>req.body
    const user = await serviceCreateUser( payload )
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export async function getUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  res.send(req.middlewareData.user)
}

export async function updateUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body: updates } = req
    const { id } = req.params
    const { user } = req.middlewareData
    const nextUser = await serviceUpdateUser( id, updates )
    res.send(nextUser)
  } catch (err) {
    next(err)
  }
}

export async function destroyUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await servicedestroyUser( req.params.id )
    res.send('OK')
  } catch (err) {
    next(err)
  }
}
