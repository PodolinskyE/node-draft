import { logger } from './utils/logger/logger'

const host = {
  env: process.env.NODE_ENV || 'local',
  url: 'localhost',
  port: 4321
}


export const config = {
  host
}


logger.info(`
  
  +------------------------------------------------------------------------------+
  |                                   config                                     |
  +------------------------------------------------------------------------------+
      NODE_ENV : ${process.env.NODE_ENV}

      process.argv[0] : ${process.argv[0]}
      process.argv[1] : ${process.argv[1]}
      process.argv[2] : ${process.argv[2]}
      HOST : ${config.host.url}
      PORT : ${config.host.port}
  +------------------------------------------------------------------------------+

`)