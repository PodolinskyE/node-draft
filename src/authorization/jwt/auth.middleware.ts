import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { config } from '../../config'
import { parseToken } from './auth.service'
import { getById } from '../../components/user/user.service'


type JwtPayload = {
  iat: number
  exp: number
  id: string
  username: string
}

export const parseAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = parseToken(req.cookies, req.headers)
    let payload: JwtPayload
    try {
      payload = verify(
        token,
        config.jwt.key,
        { ignoreExpiration: false }
      ) as JwtPayload
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(407).json({ message: `token expired at ${err.expiredAt}` })
        return
      }
      res.clearCookie('access-token')
      res.status(403).json({ message: 'auth error' })
      return
    }
    const { id } = payload
    const user = await getById(id)

    if (!user) {
      res.clearCookie('access-token')
      res.status(404).json({ message: 'Cant find user' })
      return
    }

    req.middlewareData.actor = { ...user, _collection: 'users' }
    next()
  } catch (e) {
    next(e)
  }
}
