import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
  ADD_NOTIFICATION, LOAD_USER,
} from 'types';
import { setToken } from 'api';


function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState();

        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }

        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState();

        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }

        action.error = error;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }

        if (action.payload.errors) {
          store.dispatch({
            type: ADD_NOTIFICATION,
            message: action.payload.errors.message,
            content: error.response.error.message,
            status: 'error',
          });
        }

        store.dispatch(action);
      },
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN || action.type === LOAD_USER) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      setToken(action.payload.user.token);
    } else {
      window.localStorage.setItem('jwt', '');
      setToken(null);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('jwt', '');
    setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
