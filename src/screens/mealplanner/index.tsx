import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView
} from 'react-native'
import {
  Text,
  Appbar,
  Card,
  Subheading,
  Paragraph
} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { Scene } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'
import { TabView, SceneMap, Route } from 'react-native-tab-view'
import { get, noop } from 'lodash'
import { mealplanItems, MealplanItem } from 'src/data'

import Modal from './create'

const FirstRoute = () => (
  <Scene backgroundColor='#ff4081'><View /></Scene>
)
const SecondRoute = () => (
  <Scene backgroundColor='#673ab7'><View /></Scene>
)
const colors = [
  '#3A86FF',
  '#E07A5F',
  '#C3BEF7',
  '#444444',
  '#E2EB98',
  '#F18701',
  '#81B29A'
]

const typeColors = {
  'Guide': '#6e86ae',
  'Recipe collection': '#f086a4',
  'Video': '#e73568',
  'Success story': '#f3aec3'
}

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  index: number
  createVisible: boolean
  routes: Route[]
}
class Screen extends PureComponent<Props, State> {
  static navigationOptions = {
    header: ({ scene, navigation }) => {
      const action = get(scene, 'route.params.openCreate', noop)
      return (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack(null)} />
          <Appbar.Content title='My Meal planner' />
          <View />
          <Appbar.Action icon='add' onPress={action} />
        </Appbar.Header>
      )
    }
  }
  state: State = {
    index: 0,
    createVisible: false,
    routes: mealplanItems.map((v, i) => ({
      key: `${i}`,
      title: v.title
    }))
  }

  componentDidMount () {
    this.props.navigation.setParams({
      openCreate: this.openCreate
    })
  }

  openCreate = () => this.setState({ createVisible: true })
  closeCreate = () => this.setState({ createVisible: false })

  render () {
    const { createVisible } = this.state
    return (
      <Scene backgroundColor='#F3F2F9'>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
        <Modal
          onDismiss={this.closeCreate}
          searchVisible={createVisible}
        />
      </Scene>
    )
  }
}

const s = StyleSheet.create({
  type: {
    fontSize: 12,
    fontFamily: 'diet-doctor-sans-medium',
    color: '#fff'
  },
  list: {
    paddingHorizontal: 10
  },
  subheading: {
    fontSize: 14,
    fontFamily: 'diet-doctor-sans-medium',
    marginHorizontal: 10
  },
  card: {
    width: 250,
    margin: 5
  },
  image: {
    width: 250,
    height: 150
  },
  content: {
    marginTop: 30
  }
})

export default Screen
