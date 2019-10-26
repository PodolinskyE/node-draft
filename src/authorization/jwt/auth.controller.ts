import { Request, Response, NextFunction } from 'express'

import { findUsername } from '../../components/user/user.service'

export async function createTokens (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = req.body
    const user = await findUsername( username )
    // TODO passwords encription
    // TODO diff login error and username error
    // TODO API errors
    if (!user || user.password !== password) {
      next(new Error('auth error'))
      return
    }
    
    
    
    
    
    
    res.send('OK')
  } catch (err) {
    next(err)
  }
}

export async function refreshTokens (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.send('OK')
  } catch (err) {
    next(err)
  }
}