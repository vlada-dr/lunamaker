import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { reducer } from './reducer'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

export function configureStore({ history, initialState = {} }) {
  const connectedRouter = connectRouter(history)
  const middlewares = [
    routerMiddleware(history),
    createLogger(),
    thunk,
    promiseMiddleware,
    localStorageMiddleware,
  ]

  const store = createStore(
    connectedRouter(reducer),
    initialState,
    applyMiddleware(...middlewares),
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
