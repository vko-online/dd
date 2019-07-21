import React from 'react'
import { IconButton, Appbar } from 'react-native-paper'
import {
  createStackNavigator,
  createDrawerNavigator,
  NavigationActions,
  NavigationAction
} from 'react-navigation'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { REHYDRATE } from 'redux-persist/es/constants'
import { Action } from 'redux'
import { connect } from 'react-redux'
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition'
import { get } from 'lodash'

import Drawer from './drawer'
import { LOGOUT } from '../constants/actionTypes'
import Auth from '../screens/auth'
import Home from '../screens/home'
import Intro from '../screens/intro'
import Mealplanner from '../screens/mealplanner'
// import Profile from '../screens/profile'
// import Login from '../screens/login'
// import Reviews from '../screens/reviews'
// import Orders from '../screens/orders'
// import OrderView from '../screens/viewOrder'

// const NewOrderStack = createStackNavigator({
//   NewOrderTextInfo,
//   NewOrderPriceInfo
// }, {
//   initialRouteName: 'NewOrderTextInfo'
// })

const MainStack = createStackNavigator({
  Home,
  Profile: Home,
  Mealplanner,
  Reviews: Home,
  Balance: Home
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: ({ navigation, scene }) => {
      return (
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={navigation.openDrawer} />
          <Appbar.Content
            title={scene.descriptor.options.title}
          />
        </Appbar.Header>
      )
    },
    headerStyle: {
      backgroundColor: '#516cd3',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'Avenir Next',
      fontWeight: '300'
    }
  },
  transitionConfig: getSlideFromRightTransition
})

const DrawerNavigator = createDrawerNavigator({
  MainStack
}, {
  initialRouteName: 'MainStack',
  contentComponent: (props) => <Drawer {...props} />
})

const AppNavigator = createStackNavigator({
  Intro,
  Auth,
  Drawer: DrawerNavigator
}, {
  headerMode: 'none',
  initialRouteName: 'Drawer'
})

// reducer initialization code
const firstAction = AppNavigator.router.getActionForPathAndParams('Drawer')
const tempNavState = AppNavigator.router.getStateForAction(firstAction as NavigationAction)
const initialNavState = AppNavigator.router.getStateForAction(tempNavState)
export const navReducer = (state = initialNavState, action: Action<any>) => {
  let nextState
  switch (action.type) {
    case REHYDRATE:
      try {
        const jwt = get(action, 'payload.auth.jwt', false)
        console.log('action', action)
        if (!jwt) {
          const { routes, index } = state
          if (routes[index].routeName !== 'Auth') {
            nextState = AppNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'Auth' }),
              state
            )
          }
        }
      } catch (e) {
        const { routes, index } = state
        if (routes[index].routeName !== 'Auth') {
          nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Auth' }),
            state
          )
        }
      }
      break
    case LOGOUT:
      const { routes, index } = state
      if (routes[index].routeName !== 'Auth') {
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Auth' }),
          state
        )
      }
      break
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export const navMiddleware = createReactNavigationReduxMiddleware<any>(
  (state) => state.nav
)
const App = createReduxContainer(AppNavigator)
const mapStateToProps = (state) => ({
  state: state.nav
})
export default connect(mapStateToProps)(App)
