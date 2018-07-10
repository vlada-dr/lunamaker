import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from 'types'


function isPromise(v) {
  return v && typeof v.then === 'function'
}

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type })

    const currentView = store.getState().viewChangeCounter
    const skipTracking = action.skipTracking

    action.payload.then(
      (res) => {
        const currentState = store.getState()

        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res)
        action.payload = res
        store.dispatch({ type: ASYNC_END, promise: action.payload })
        store.dispatch(action)
      },
      (error) => {
        const currentState = store.getState()

        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error)
        action.error = error
        action.payload = error.response.body
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload })
        }
        store.dispatch(action)
      },
    )

    return
  }

  next(action)
}

const localStorageMiddleware = (store) => (next) => (action) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('id', action.payload.id)
    }
  }
  else if (action.type === LOGOUT) {
    window.localStorage.setItem('cookies', '')
  }

  next(action)
}


export { promiseMiddleware, localStorageMiddleware }
