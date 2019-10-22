import { logger } from './utils/logger/logger'
import { init as initServer, start as startServer } from './server'
import { init as bindRoutes } from './routes'

async function init (): Promise<void> {

  initServer()
  logger.info('server initiated')
  bindRoutes()
  logger.info('routes are bound')
  startServer()
  logger.info('server started')
  
}

init()

export {}