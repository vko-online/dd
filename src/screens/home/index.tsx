import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { Headline, FAB } from 'react-native-paper'
import { Scene } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'
import { primary, secondary } from 'src/theme'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
class Screen extends PureComponent<Props> {
  render () {
    return (
      <Scene>
        <Headline>Home</Headline>
        <FAB
          style={s.fab}
          icon='add'
          color={primary}
          onPress={() => console.log('Pressed')}
        />
      </Scene>
    )
  }
}

const s = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  }
})

export default Screen
