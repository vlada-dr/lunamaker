import { createLogger } from 'redux-logger'
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { reducer } from './reducer'
import { createStore, applyMiddleware, compose as composeEnhancers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'


export function configureStore({ history, initialState = {} }) {
    const connectedRouter = connectRouter(history)
    const middlewares = [
      routerMiddleware(history),
      createLogger(),
      promiseMiddleware,
      localStorageMiddleware,
    ]

    const store = createStore(
      connectedRouter(reducer),
      initialState,
      composeEnhancers(applyMiddleware(...middlewares)),
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
            createLogger()
        )
    )
    return store
}
