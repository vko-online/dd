import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image
} from 'react-native'
import {
  Text,
  Appbar,
  Card,
  Subheading,
  Paragraph
} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { Scene, Hpane } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view'
import { get, noop } from 'lodash'
// import SvgUri from 'react-native-svg-uri'
import { mealplanItems, MealplanItem } from 'src/data'
import { primary } from 'src/theme'

import Modal from './create'
import Block from './block'

const ScreenRoute = () => (
  <ScrollView>
    <Block />
    <Block
      title='Low carb: Dinner in 30 minutes or less'
      description='Hearty homemade meals in under 30 minutes. Is that possible? Yes, this week’s meal plan offers delicious meals that you’ll have on the table in half an hour or less. Enjoy a variety of meals while staying below 35 grams of carbs per day.'
    />
    {/* <Block
      title='Low carb: Easy cooking'
      description='Don’t feel like much of a chef but still want to serve and have healthy homemade meals? This is the meal plan for you! Boost your confidence in the kitchen with these delicious and easy-to-make recipes that help you stay below 25 grams of carbs per day.'
    /> */}
  </ScrollView>
)
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
      title: v.title,
      icon: v.image
    }))
  }

  componentDidMount () {
    this.props.navigation.setParams({
      openCreate: this.openCreate
    })
  }

  openCreate = () => this.setState({ createVisible: true })
  closeCreate = () => this.setState({ createVisible: false })
  renderLabel = ({ route, focused, color }) => (
    <Hpane>
      {/* <SvgUri source={{ uri: route.icon }} width={25} height={25} fillAll='#fff' /> */}
      <Text style={{ color: focused ? '#444' : '#666', margin: 8, fontFamily: 'diet-doctor-sans-medium' }}>
        {route.title}
      </Text>
    </Hpane>
  )
  renderScene = ({ route }) => {
    if (this.state.index !== 0) {
      return <View />
    }

    return <ScreenRoute />
  }

  render () {
    const { createVisible } = this.state
    return (
      <Scene backgroundColor='#F3F2F9'>
        <TabView
          navigationState={this.state}
          sceneContainerStyle={{ flex: 1 }}
          lazy
          removeClippedSubviews
          renderScene={this.renderScene}
          renderTabBar={props =>
            <TabBar
              {...props}
              renderLabel={this.renderLabel}
              scrollEnabled
              style={{ backgroundColor: '#fff' }}
              indicatorStyle={{ backgroundColor: primary }}
            />
          }
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
        />
        <Modal
          onDismiss={this.closeCreate}
          createVisible={createVisible}
        />
      </Scene>
    )
  }
}

const s = StyleSheet.create({
  image: {
    width: 25,
    height: 25
  }
})

export default Screen
