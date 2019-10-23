import { User, UserFields, userWhiteList } from '../../entities/user'


export enum ListSortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export const ListSortAllowed = [
  UserFields.Username,
  UserFields.CreateDate
]

type SkipLimit = {
  skip: number
  limit: number
}

type Sort = {
  [key in UserFields]: 1 | -1
}
/*
type Projection = {
  [key: in keyof userWhiteList] : 1 | 0
}
*/

/*
type UserListRequestPayload = {
  [key: string]: {
    [key in UserFields] : string | string[]
    inclusive : boolean
  }
}
*/


/*
export type TimeInterval = {
  start: Date
  end: Date
}


export type UserListQuery = {
  fields: string[]
  [UserFields.CreateDate]: TimeInterval,
  sort: {
    // TODO resolve
    field: <ListSortAllowed>,
    order: ListSortOrder
  }
  limit: SkipLimit
}
*/