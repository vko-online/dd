import { all, put, takeLatest, fork } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/es/constants'
import { NavigationActions } from 'react-navigation'
import { get } from 'lodash'

import { SHOW_INTRO } from 'src/constants/actionTypes'

function* getIntro (action) {
  const intro = get(action, 'payload.intro', false)
  if (!intro) {
    yield put(NavigationActions.navigate({ routeName: 'Intro' }))
  }
}

function* showIntro (action) {
  yield put(NavigationActions.navigate({ routeName: 'Intro' }))
}

function* checkIntro () {
  yield takeLatest(REHYDRATE, getIntro)
  yield takeLatest(SHOW_INTRO, showIntro)
}

export default function* root () {
  yield fork(checkIntro)
}
