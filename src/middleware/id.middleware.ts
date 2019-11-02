import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'


export function validateIdFormat (req: Request, res: Response, next: NextFunction): void {
  if (!ObjectId.isValid(req.params.id)) {
    return next(Error('Bad request. Id is not valid'))
  }

  next()
}
