import { Collection, Db, ReadPreference } from 'mongodb'

import { config } from './config'
import {
  User,
  RefreshToken
} from './entities'


export let userRepository: Collection<User>
export let refreshTokenRepository: Collection<RefreshToken>

const options = config.host.env === 'local'
  ? null
  : { wtimeout: 5000, readPreference: ReadPreference.NEAREST }

export function initRepositories (db: Db): void {
  userRepository = db.collection('users', options, () => {})
  refreshTokenRepository = db.collection('refresh-tokens', options, () => {})
}
