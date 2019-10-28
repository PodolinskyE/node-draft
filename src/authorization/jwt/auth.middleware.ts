import { Request, Response, NextFunction } from 'express'
import { verify, VerifyOptions, sign } from 'jsonwebtoken'

import { config } from '../../config'
import { getToken } from './auth.service'
import { getById } from '../../components/user/user.service'

type JwtPayload = {
  iat: number
  exp: number
  id: string
  username: string
}

export const parseAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = await getToken(req.cookies, req.headers)
    let payload: JwtPayload
    try {
      payload = <JwtPayload>verify(
        token,
        config.jwt.key,
        { ignoreExpiration: false }
      )
    } catch (err) {
      res.clearCookie('auth-token')
      res.status(403).json({ message: 'auth error'})
      return
    }
    
    const { id, username } = payload
    
    const user = await getById(id)
    
    if (!user) {
      res.clearCookie('auth-token')
      res.status(404).json({ message: 'Cant find user'})
      return
    }
    
    req.middlewareData.actor = { ...user, _collection: 'users'}
    next()
  } catch( e ) {
    next( e )
  }
}
