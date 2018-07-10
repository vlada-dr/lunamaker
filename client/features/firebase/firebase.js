import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const config = {
  apiKey: 'AIzaSyC1nTEYGMKpEJ2gZ_aW65Im3oW7pl8AfhQ',
  authDomain: 'surpriseu-4bd06.firebaseapp.com',
  databaseURL: 'https://surpriseu-4bd06.firebaseio.com',
  projectId: 'surpriseu-4bd06',
  storageBucket: 'surpriseu-4bd06.appspot.com',
  messagingSenderId: '500233386669',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()

export {
  db,
  auth,
}

