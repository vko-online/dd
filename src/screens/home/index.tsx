import React, { PureComponent } from 'react'
import {
  View
} from 'react-native'
import { Headline } from 'react-native-paper'
import { Scene } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
class Screen extends PureComponent<Props> {
  render () {
    return (
      <Scene>
        <Headline>Home</Headline>
      </Scene>
    )
  }
}

export default Screen
