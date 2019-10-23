import { Request, Response, NextFunction } from 'express'

import { User } from '../../entities/user'
import { getById as getUserBuId } from './user.service'


export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await getUserBuId(req.params.id)
    
    if (!user) {
      res.status(404).json({ message: 'Cant find user'})
    }
    req.middlewareData.user = user
    next()    
  } catch( e ) {
    next( e )
  }
}