import { init as initServer, start as startServer } from './server'
import { init as bindRoutes } from './routes'


async function init (): Promise<void> {

  initServer()
  console.log('server initiated')
  bindRoutes()
  console.log('routes are bound')
  startServer()
  console.log('server started')
  
}

init()

export {}