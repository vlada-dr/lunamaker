import { db } from './firebase'

// User API

export const doCreateUser = (user) => (
  db.ref.child(`users/${user.uid}/info`).set({
    email: user.email,
    uid: user.uid,
  })
    .then(() => user)
)

export const onceGetUsers = () => db.ref('users').once('value')
