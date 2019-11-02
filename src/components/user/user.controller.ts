import { Request, Response, NextFunction } from 'express'

import {
  createUser as serviceCreateUser,
  updateUser as serviceUpdateUser,
  destroyUser as serviceDestroyUser,
  getUsersPage as serviceGetUsersPage
} from './user.service'

export async function createUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await serviceCreateUser(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
}

export async function getUsersPage (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { query } = req

    const userList = await serviceGetUsersPage(query)

    res.send(userList)
  } catch (err) {
    next(err)
  }
}

export function getMe (req: Request, res: Response, next: NextFunction): void {
  res.send(req.middlewareData.actor)
}

export function getUser (req: Request, res: Response, next: NextFunction): void {
  res.send(req.middlewareData.user)
}

export async function updateUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { body: updates } = req
    const { id } = req.params
    const nextUser = await serviceUpdateUser(id, updates)
    res.send(nextUser)
  } catch (err) {
    next(err)
  }
}

export async function destroyUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await serviceDestroyUser(req.params.id)
    res.send('OK')
  } catch (err) {
    next(err)
  }
}
