import { Default } from './default'

export enum UserFields {
  Id = '_id',
  Username = 'username',
  Password = 'password',
  Passhash = 'passhash',
  CreateDate = 'createDate',
  UpdateDate = 'updateDate'
}

export const userWhiteList = [
  UserFields.Id,
  UserFields.Username,
  UserFields.CreateDate,
  UserFields.UpdateDate
]

export const userBlackList = [
  UserFields.Password,
  UserFields.Passhash
]

export const usersBlackProjection = userBlackList
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: 0
  }), {})


export const usersWhiteProjection = userWhiteList
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: 1
  }), {})


export const usersOutProjection = {
  ... usersWhiteProjection,
  ... usersBlackProjection
}

export type User = {
  [UserFields.Username]: string,
  [UserFields.Password]?: string
  [UserFields.Passhash]?: string
} & Default



