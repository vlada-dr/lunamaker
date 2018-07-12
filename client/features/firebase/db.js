import { db } from './firebase'

// User API

export const doCreateUser = (user) => (
  db.collection('users').doc(user.uid).set(user).then(() => user)
)

export const currentUser = (id) => (
  db.collection('users').doc(id).get()
)
