import { MongoClient, connect, Db } from 'mongodb'
import { logger } from '../utils/logger/logger'
import { config } from '../config'


let db: Db
let client: MongoClient


export const init = async function (): Promise<Db> {
  client = await connect(
    config.db.main.uri,
    config.db.main.options
  )
  db = client.db(config.db.main.name)
  db.once('open', () => logger.info('connected to database'))
  db.on('error', (error) => logger.error(error))
  db.on('reconnect', () => logger.error('Connection to MongoDB reconnected'))
  db.on('close', () => logger.error('Connection to MongoDB closed'))

  return db
}
