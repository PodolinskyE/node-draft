import { Default } from './default'


export type User = {
  username: string
  passhash: string
} & Default

export enum blackList {
  Password = 'password',
  Passhash = 'passhash'
}

export const getUsersProjection = Object.values(blackList)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: 0
  }), {})

