import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import { handleError } from './utils/error.controller'
import { initCommonMiddleware } from './utils/common.middleware'


export let server: Express


export function init (): void {
  server = express()
  server.disable('x-powered-by')
  server.use(express.json({
    limit: '50mb'
  }))
  server.use(cookieParser())
  // add middleware data field
  server.use(initCommonMiddleware)
}


export function start (): void {
  server.use(handleError)
  server.listen(4321)
}