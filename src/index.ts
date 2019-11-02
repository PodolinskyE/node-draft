import { logger } from './utils/logger/logger'
import { init as connectDb } from './services/db.main'
import { initRepositories } from './repositories'
import { init as initServer, start as startServer } from './server'
import { init as bindRoutes } from './routes'


async function init (): Promise<void> {
  const connection = await connectDb()
  logger.info('db connected')

  await initRepositories(connection)
  logger.info('repositories initialised')

  initServer()
  logger.info('server initiated')

  bindRoutes()
  logger.info('routes are bound')

  startServer()
  logger.info('server started')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init()


export {}
