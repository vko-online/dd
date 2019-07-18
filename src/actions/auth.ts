import { SET_CURRENT_USER, LOGOUT } from '../constants/actionTypes'

export const setCurrentUser = (user: any) => ({
  type: SET_CURRENT_USER,
  user
})

export const logout = () => ({ type: LOGOUT })
