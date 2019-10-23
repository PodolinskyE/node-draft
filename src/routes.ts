import { server } from './server'


import { apiRouter } from './components/api.router'
import { notFoundRouter } from './components/notFound'

export function init (): void {
  server.use('/api/0', apiRouter)
  server.use(notFoundRouter)
}