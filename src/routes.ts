import { server } from './server'

import { pong } from './utils/ping.controller'
import { apiRouter } from './components/api.router'
import { notFoundRouter } from './components/notFound'

export function init (): void {
  server.use('/ping', pong)
  server.use('/api/0', apiRouter)
  server.use(notFoundRouter)
}