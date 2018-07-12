import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const auth = firebase.auth()
const db = firebase.firestore()


db.settings({ timestampsInSnapshots: true })

export {
  db,
  auth,
}

