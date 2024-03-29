import { Request, Response, NextFunction } from 'express'


import { Logger } from './logger'

export function attachLogger (req: Request, res: Response, next: NextFunction): void {
  req.log = new Logger(req, res)
  next()
}

export function logRoute (request: Request, response: Response, next: NextFunction): void {
  const method = request.method
  request.log.info('')
  next()
}
