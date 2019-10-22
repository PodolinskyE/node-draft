import { init as initServer, start as startServer } from './server'



async function init (): Promise<void> {

  initServer()
  console.log('server initiated')
  startServer()
  console.log('server started')
  
}

init()

export {}