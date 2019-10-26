import { config } from './config'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import { handleError } from './utils/error.controller'
import { initCommonMiddleware } from './middleware/common.middleware'
import { attachLogger, logRoute } from './utils/logger/logger.middleware'


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
  
  server.use(attachLogger)
  if (config.host.env === 'local') {
    server.use(logRoute)
  }
}


export function start (): void {
  server.use(handleError)
  server.listen(config.host.port)
}