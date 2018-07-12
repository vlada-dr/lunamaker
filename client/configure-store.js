import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'
import { reducer } from './reducer'
import { promiseMiddleware, localStorageMiddleware } from './middleware'


const fb = {
  apiKey: 'AIzaSyC1nTEYGMKpEJ2gZ_aW65Im3oW7pl8AfhQ',
  authDomain: 'surpriseu-4bd06.firebaseapp.com',
  databaseURL: 'https://surpriseu-4bd06.firebaseio.com',
  projectId: 'surpriseu-4bd06',
  storageBucket: 'surpriseu-4bd06.appspot.com',
  messagingSenderId: '500233386669',
}

const reduxConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

firebase.initializeApp(fb)
firebase.firestore().settings({ timestampsInSnapshots: true })


export function configureStore({ history, initialState = {} }) {
  const connectedRouter = connectRouter(history)
  const middlewares = [
    routerMiddleware(history),
    createLogger(),
    thunk.withExtraArgument(getFirebase),
    promiseMiddleware,
    localStorageMiddleware,
  ]

  const store = createStore(
    connectedRouter(reducer),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      reduxFirestore(firebase),
      reactReduxFirebase(firebase, reduxConfig),
    ),
  )

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      // eslint-disable-next-line global-require
      const next = require('./reducer')

      store.replaceReducer(connectedRouter(next.reducer))
    })
  }

  return store
}

export default function configureStor(initialState) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      promiseMiddleware,
      localStorageMiddleware,
      createLogger(),
    ),
  )

  return store
}
