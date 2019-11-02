import { server } from './server'

import { pong } from './utils/ping.controller'
import { authRouter } from './authorization/auth.router'
import { parseAuth } from './authorization/jwt/auth.middleware'
import { apiRouter } from './components/api.router'
import { notFoundRouter } from './components/notFound'


export function init (): void {
  // health monitoring
  server.use('/ping', pong)

  // login routes
  server.use('/auth', authRouter)

  // auth middleware
  server.all('*', parseAuth)

  // api routes
  server.use('/api/0', apiRouter)

  server.use(notFoundRouter)
}
