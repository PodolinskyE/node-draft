import { Request, Response, NextFunction } from 'express'


export function pong (req: Request, res: Response, next: NextFunction): void {
  try {
    res.send('pong')
  } catch (e) {
    next(e)
  }
}
