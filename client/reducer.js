import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { userReducer as user } from 'features/user/reducer'
import { presentReducer as present } from 'features/present/reducer'
import { authReducer as auth } from 'features/auth/reducer'
import { tagReducer as tag } from 'features/tag/reducer'
import { commonReducer as common } from 'features/reducer'


export const reducer = combineReducers({
  auth,
  common,
  present,
  tag,
  user,
  firebase: firebaseReducer,
})
