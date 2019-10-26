db.getCollection('users')
  .updateMany(
    {},
    { $set: { description: '' } }
  )
