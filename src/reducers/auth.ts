import { REHYDRATE } from 'redux-persist/es/constants'
import Immutable from 'seamless-immutable'

import { LOGOUT, SET_CURRENT_USER } from '../constants/actionTypes'

const initialState = Immutable(null)

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload && action.payload.auth) {
        return Immutable(action.payload.auth)
      }
      return Immutable(state)
    case SET_CURRENT_USER:
      return state.merge(action.user)
    case LOGOUT:
      return Immutable(null)
    default:
      return state
  }
}

export default auth
