import { Request, Response, NextFunction } from 'express'


import { Logger } from './logger'

export function attachLogger (req: Request, res: Response, next: NextFunction): void {
  req.log = new Logger(req, res)
  next()
}

export function logRoute (req: Request, res: Response, next: NextFunction): void {
  const method = req.method
  req.log.info('')
  next()
}
