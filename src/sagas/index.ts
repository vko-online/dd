import { fork } from 'redux-saga/effects'

import intro from './intro'

export default function* root () {
  yield fork(intro)
}
