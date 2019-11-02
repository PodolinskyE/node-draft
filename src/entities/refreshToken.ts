import { Default } from './default'


export enum RefreshTokenFields {
  Id = '_id',
  CreateDate = 'createDate',
  UpdateDate = 'updateDate',
  Deleted = 'deleted',

  UserId = 'userId',
  Token = 'token',
  ExpiresIn = 'expiresIn',
}

export type RefreshToken = {
  [RefreshTokenFields.UserId]: string
  [RefreshTokenFields.Token]: string
  [RefreshTokenFields.ExpiresIn]: Date
} & Default
