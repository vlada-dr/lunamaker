import { db } from './firebase'

// User API

export const doCreateUser = (user) => (
  db.collection('users').add(user)
    .then((docRef) => console.log(docRef))
    .catch((error) => {
      console.error('Error adding document: ', error)
    })
)

export const onceGetUsers = () => db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`)
  })
})

