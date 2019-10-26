import { Request, Response, NextFunction } from 'express'

export async function createTokens (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
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