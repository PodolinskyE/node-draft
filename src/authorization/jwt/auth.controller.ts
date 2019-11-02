import { Request, Response, NextFunction } from 'express'

import { config } from '../../config'
import {
  genAccessToken as serviceGenAccessToken,
  getAccessTokenOptions as serviceGetAccessTokenOptions,
  nextRefreshToken as serviceNextRefreshToken,
  getRefreshTokenOptions as servicegetRefreshTokenOptions,
  getRefreshToken as serviceGetRefreshToken,
  updateRefreshToken as serviceUpdateRefreshToken,
  checkPassword as serviceCheckPassword
} from './auth.service'

import {
  createUser as serviceCreateUser,
  getById as serviceGetById,
  findUsername as serviceFindUsername
} from '../../components/user/user.service'
import { User } from '../../entities/user'

export async function registerUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await serviceCreateUser(req.body)
  const accessToken = serviceGenAccessToken(user)

  res.send({
    user: user,
    accessToken: accessToken,
    accessExpires: config.jwt.accessExpires
  })
}

export async function loginUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body
    const user = await serviceFindUsername(username)
    if (!user) {
      res.status(404).send('User not found!')
      return
    }
    const result = await serviceCheckPassword(password, user.passhash)
    if (!result) {
      res.status(403).send('Password not valid!')
      return
    }

    const { nextRefreshToken, accessToken } = await genTokenPair(user)
    res.cookie('access-token', accessToken, serviceGetAccessTokenOptions())
    res.cookie('refresh-token', nextRefreshToken, servicegetRefreshTokenOptions())

    res.send({
      user: user,
      refreshToken: nextRefreshToken,
      accessToken: accessToken
    })
  } catch (err) {
    next(err)
  }
}

export async function refreshUserToken (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const refreshToken = req.cookies['refresh-token'] || null
    const dbToken = await serviceGetRefreshToken(refreshToken)
    if (!dbToken) {
      res.status(404).send({ message: 'User not found!' })
      return
    }
    const user = await serviceGetById(dbToken.userId)
    if (!user) {
      res.status(404).send('User not found!')
      return
    }

    const { nextRefreshToken, accessToken } = await genTokenPair(user)
    res.cookie('access-token', accessToken, serviceGetAccessTokenOptions())
    res.cookie('refresh-token', nextRefreshToken, servicegetRefreshTokenOptions())

    res.send({
      user: user,
      refreshToken: nextRefreshToken,
      accessToken: accessToken
    })
  } catch (err) {
    next(err)
  }
}

async function genTokenPair (user: User): Promise<{nextRefreshToken: string, accessToken: string}> {
  const nextRefreshToken = serviceNextRefreshToken()
  await serviceUpdateRefreshToken(user._id.toHexString(), nextRefreshToken)
  const accessToken = serviceGenAccessToken(user)
  return { nextRefreshToken, accessToken }
}
