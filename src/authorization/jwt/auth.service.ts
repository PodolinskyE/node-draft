import { CookieOptions } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import * as uuid from 'uuid/v4'

import { refreshTokenRepository } from '../../repositories'
import { User } from '../../entities/user'
import { RefreshToken } from '../../entities/refreshToken'
import { config } from '../../config'
const { jwt: jwtConf } = config


export function parseToken (cookies: any, headers: any): string {
  const token = cookies['access-token'] || headers['access-token'] || null
  return token
}

export function genAccessToken (user: User): string {
  return sign({
    id: user._id.toHexString(),
    username: user.username
  },
  jwtConf.key,
  { expiresIn: jwtConf.accessExpires }
  )
}

export function getAccessTokenOptions (): CookieOptions {
  return {
    ...jwtConf.options,
    expires: new Date(Date.now() + jwtConf.cookieExpires)
  }
}

export function nextRefreshToken (): string {
  return uuid.default()
}

export async function getRefreshToken (token: string): Promise<RefreshToken> {
  return refreshTokenRepository.findOne({
    token,
    deleted: null
  })
}

export async function updateRefreshToken (userId: string, token: string): Promise<void> {
  await refreshTokenRepository.findOneAndUpdate(
    { userId, deleted: null },
    {
      $set: {
        token,
        updateDate: new Date()
      }
    },
    { upsert: true, returnOriginal: true }
  )
}

export async function deleteRefreshToken (userId: string): Promise<void> {
  await refreshTokenRepository.deleteOne({
    userId
  })
}

export function getRefreshTokenOptions (): CookieOptions {
  return {
    ...jwtConf.options,
    expires: new Date(Date.now() + jwtConf.cookieExpires)
  }
}

export async function checkPassword (pass: string, hash: string): Promise<boolean> {
  return compare(pass, hash)
}
