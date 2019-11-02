import { ObjectId } from 'mongodb'
import { hashSync } from 'bcryptjs'

import { userRepository } from '../../repositories'
import { User } from '../../entities/user'

export const createUser = async (
  payload: User
): Promise<User> => {
  const passhash = hashSync(payload.password)

  const now = new Date()
  const data: User = {
    ...payload,
    passhash,
    createDate: now,
    updateDate: now
  }
  const { ops: [user] } = await userRepository.insertOne(data)
  // TODO: omit blacklist
  return user
}

export async function getUsersPage (filter: any) {
  return await userRepository
    .find()
    .toArray()
}

export function getById (id: string) {
  return userRepository.findOne({
    _id: new ObjectId(id),
    deleted: null
  })
}

export const updateUser = async (
  id: string,
  updates: Partial<User>
): Promise<User> => {
  return (await userRepository.findOneAndUpdate(
    {
      _id: new ObjectId(id),
      deleted: null
    },
    { $set: { ...updates, updateDate: new Date() } },
    { returnOriginal: false }
  )).value
}

export async function destroyUser (id: string) {
  return await userRepository
    .deleteOne({
      _id: new ObjectId(id)
    })
}

export async function findUsername (username: string): Promise<User> {
  return await userRepository
    .findOne({
      username
    })
}
