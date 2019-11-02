import { MongoClientOptions } from 'mongodb'
import { logger } from './utils/logger/logger'

const host = {
  env: process.env.NODE_ENV || 'local',
  url: 'localhost',
  port: 3000
}

const jwt = {
  key: 'learn',
  accessExpires: 5 * 60, // seconds
  cookieExpires: 1000 * 60 * 60 * 24 * 365, // 1 year
  options: {
    httpOnly: true,
    sameSite: true
  }
}

const mongodbs: { [key: string]: { [key: string]: { uri: string, name: string, options: MongoClientOptions } } } = {
  local: {
    main: {
      uri: 'mongodb://localhost:27017',
      name: 'sandbox-node-draft',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 5, // default
        keepAliveInitialDelay: 30000, // default
        connectTimeoutMS: 5000 // default === 30000
      }
    }
  }
}

export const config = {
  host,
  db: mongodbs.local,
  jwt
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
      DB              : ${config.db.main.uri}
      DB name         : ${config.db.main.name}
  +------------------------------------------------------------------------------+

`)
