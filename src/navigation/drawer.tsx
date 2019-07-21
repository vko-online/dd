import React, { PureComponent } from 'react'
import { Image } from 'react-native'
import {
  DrawerItemsProps
} from 'react-navigation'
import { Avatar, Text, Drawer, Subheading, Caption, Divider, Dialog, Portal, Button, Paragraph } from 'react-native-paper'
import { connect } from 'react-redux'
import { Scene, Hpane, Vpane } from 'view-on-steroids'

import { logout } from '../actions/auth'

interface Props extends DrawerItemsProps {
  logout: () => void
  auth: any
}
interface State {
  visible: boolean
}

class DrawerComponent extends PureComponent<Props, State> {
  state: State = {
    visible: false
  }
  showDialog = () => this.setState({ visible: true })
  hideDialog = () => this.setState({ visible: false })
  handleSignOut = () => {
    const { logout } = this.props
    this.hideDialog()
    logout()
  }
  renderUser = () => {
    const {
      navigation,
      auth
    } = this.props
    if (auth) {
      return (
        <Hpane padding={20} justifyContent='flex-start' alignItems='center'>
          <Avatar.Image source={{ uri: auth.photoURL, cache: 'force-cache' }} />
          <Vpane marginLeft={20}>
            <Subheading>{auth.displayName}</Subheading>
            <Caption>{auth.phoneNumber}</Caption>
          </Vpane>
        </Hpane>
      )
    }
    return (
      <Hpane padding={20} justifyContent='flex-start' alignItems='center'>
        <Avatar.Icon icon='account-circle' />
        <Vpane marginLeft={20}>
          <Subheading>Not Authenticated</Subheading>
          <Caption>Please log in</Caption>
        </Vpane>
      </Hpane>
    )
  }
  render () {
    const {
      navigation,
      auth
    } = this.props
    const { visible } = this.state
    const parentRoute = navigation.state.routes[navigation.state.index]
    const { routeName } = parentRoute.routes[parentRoute.index]
    return (
      <Scene paddingTop={30}>
        {this.renderUser()}
        <Drawer.Section>
          <Drawer.Item active={routeName === 'MyFavorites'} label='My favorites' icon='favorite' onPress={() => navigation.navigate('MyFavorites')} />
          <Drawer.Item active={routeName === 'Mealplanner'} label='Meal planner' icon='date-range' onPress={() => navigation.navigate('Mealplanner')} />
          <Drawer.Item active={routeName === 'MyAccount'} label='My account' icon='account-circle' onPress={() => navigation.navigate('MyAccount')} />
        </Drawer.Section>
        <Drawer.Item label='Low carbo & keto' />
        <Drawer.Item label='Recipes' />
        <Drawer.Item label='Health' />
        <Drawer.Item label='Video' />
        <Drawer.Item label='News' />
        <Divider />
        <Drawer.Item label='Log out' icon='exit-to-app' onPress={this.showDialog} />
        <Portal>
          <Dialog
             visible={visible}
             style={{ backgroundColor: '#fff' }}
             onDismiss={this.hideDialog}>
            <Dialog.Title>Exit</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to logout?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='text' onPress={this.hideDialog}>Cancel</Button>
              <Button mode='text' onPress={this.handleSignOut}>Logout</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Scene>
    )
  }
}

const select = ({ auth }) => ({
  auth
})

const action = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(select, action)(DrawerComponent)
