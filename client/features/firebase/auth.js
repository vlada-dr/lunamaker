import { auth } from './firebase'
import { doCreateUser } from './db'


export const doCreateUserWithEmailAndPassword = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password)
    .then(doCreateUser)
)

export const doSignInWithEmailAndPassword = (email, password) => (
  auth.signInWithEmailAndPassword(email, password)
)

export const doSignOut = () => auth.signOut()

export const doPasswordReset = (email) => (
  auth.sendPasswordResetEmail(email)
)

export const doPasswordUpdate = (password) => (
  auth.currentUser.updatePassword(password)
)

export const getCurrentUser = () => auth.onAuthStateChanged
