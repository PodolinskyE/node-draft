import { Request, Response, NextFunction } from 'express'
import ms from 'ms'
import { sign } from 'jsonwebtoken' 
import * as uuid from 'uuid/v4'
import { compare } from 'bcryptjs'

import { config } from '../../config'
import { User } from '../../entities/user'
import {
  createUser as serviceCreateUser,
  getById as serviceGetById,
  findUsername as serviceFindUsername
} from '../../components/user/user.service'

export async function registerUser (req: Request, res: Response, next: NextFunction): Promise<void> {
  const user = await serviceCreateUser(req.body)

  const accessToken = sign({
      id: user._id.toHexString()
    },
    config.jwt.key, {
      expiresIn: config.jwt.expires
    }
  )

  res.send({
    "user": user,
    "access_token": accessToken,
    "expires_in": config.jwt.expires
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

    const result = await compare(password, user.passhash);
    if (!result) {
      res.status(401).send('Password not valid!')
      return
    }

    const authToken = sign({
        id: user._id.toHexString(),
        username: user.username
      },
      config.jwt.key, {
        expiresIn: config.jwt.expires
      }
    )

    const refreshToken = uuid.default()

    res.cookie('auth-token', authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ms('1d') ),
      sameSite: true
    })

    res.send({
      "user": user,
      "authToken": authToken,
      "refreshToken": refreshToken,
      "expires_in": config.jwt.expires
    })
  } catch (err) {
    next(err)
  }
}