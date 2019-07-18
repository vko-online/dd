import React, { PureComponent } from 'react'
import {
  DrawerItemsProps
} from 'react-navigation'
import { Avatar, Drawer, Subheading, Caption, Divider, Dialog, Portal, Button, Paragraph } from 'react-native-paper'
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
        {
          auth && (
            <Hpane padding={20} justifyContent='flex-start' alignItems='center'>
              <Avatar.Image source={{ uri: auth.photoURL, cache: 'force-cache' }} />
              <Vpane marginLeft={20}>
                <Subheading>{auth.displayName}</Subheading>
                <Caption>{auth.phoneNumber}</Caption>
              </Vpane>
            </Hpane>
          )
        }
        <Drawer.Section>
          <Drawer.Item active={routeName === 'MyFavorites'} label='My favorites' icon='library-books' onPress={() => navigation.navigate('MyFavorites')} />
          <Drawer.Item active={routeName === 'MealPlanner'} label='Meal planner' icon='list' onPress={() => navigation.navigate('MealPlanner')} />
          <Drawer.Item active={routeName === 'MyAccount'} label='My account' icon='credit-card' onPress={() => navigation.navigate('MyAccount')} />
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
             onDismiss={this.hideDialog}>
            <Dialog.Title>Выход из приложения</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Вы действительно хотите выйти из текущего профиля</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button mode='text' onPress={this.hideDialog}>Отмена</Button>
              <Button mode='text' onPress={this.handleSignOut}>Выйти</Button>
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
