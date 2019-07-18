import { all, put, takeLatest, fork } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/es/constants'
import { NavigationActions } from 'react-navigation'
import { get } from 'lodash'

function* getIntro (action) {
  const intro = get(action, 'payload.intro', false)
  console.log('getIntro', intro)
  if (!intro) {
    yield put(NavigationActions.navigate({ routeName: 'Intro' }))
  }
}

function* checkIntro () {
  yield takeLatest(REHYDRATE, getIntro)
}

export default function* root () {
  yield fork(checkIntro)
}
