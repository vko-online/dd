import { REHYDRATE } from 'redux-persist/es/constants'
import Immutable from 'seamless-immutable'

import { LOGOUT, INTRO_COMPLETED, SHOW_INTRO } from '../constants/actionTypes'

const initialState = Immutable(false)

const intro = (state = initialState, action: any) => {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload && action.payload.intro) {
        return Immutable(action.payload.intro)
      }
      return Immutable(state)
    case INTRO_COMPLETED:
      return Immutable(true)
    case SHOW_INTRO:
      return Immutable(false)
    case LOGOUT:
      return Immutable(false)
    default:
      return state
  }
}

export default intro
