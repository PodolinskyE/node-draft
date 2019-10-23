import { ObjectId } from 'mongodb'
export type Default = {
  _id?: ObjectId
  createDate: Date
  updateDate: Date
  deleted: boolean
}