import { Request, Response, NextFunction } from 'express'


export const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  req.log.error(err.message)
  res.status( 500 ).json(err);
}