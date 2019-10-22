import express, { Express } from 'express'
import cookieParser from 'cookie-parser'


export let server: Express


export function init (): void {
  server = express()
  server.disable('x-powered-by')
  server.use(express.json({
    limit: '50mb'
  }))
  server.use(cookieParser())
}


export function start (): void {
  server.listen(4321)
}