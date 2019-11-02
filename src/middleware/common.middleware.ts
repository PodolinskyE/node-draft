import { Request, Response, NextFunction } from 'express'

export const initCommonMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.middlewareData = {}
  next()
}
