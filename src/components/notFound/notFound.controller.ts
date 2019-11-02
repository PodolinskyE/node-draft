import { Request, Response, NextFunction } from 'express'

export function notFound (req: Request, res: Response, next: NextFunction): void {
  try {
    res.status(404).send('Not found')
  } catch (e) {
    next(e)
  }
}
