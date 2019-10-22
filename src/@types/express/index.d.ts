declare namespace Express {
  export interface Request {
    middlewareData?: {
      [key: string]: any
    }
    log?: import('../../utils/logger/logger').Logger
  }
}
