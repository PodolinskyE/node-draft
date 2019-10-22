declare namespace Express {
  export interface Request {
    middlewareData?: {
      [key: string]: any
    }
  }
}
