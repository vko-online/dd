import React, { PureComponent } from 'react'
import {
  FlatList,
  Modal
} from 'react-native'
import {
  Text,
  Appbar,
  Searchbar
} from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { Scene } from 'view-on-steroids'

interface Item {
  id: string
  text: string
}
interface Props {
  searchVisible: boolean
  searchText?: string
  onDismiss?: () => void
  data: Item[]
}
export default class Screen extends PureComponent<Props> {
  static defaultProps: Props = {
    searchVisible: false,
    data: []
  }
  renderEmptyComponent = () => {
    return (
      <Scene justifyContent='center' alignItems='center' flex={1}>
        <MaterialIcons name='search' color='#F3F2F9' size={100} />
      </Scene>
    )
  }

  render () {
    const { searchVisible, searchText, onDismiss } = this.props
    return (
      <Modal animated animationType='slide' visible={searchVisible} onDismiss={onDismiss}>
        <Scene backgroundColor='#fff'>
          <Appbar.Header>
            <Searchbar
              placeholder='Search mealplan, recipe, ingredient'
              value={searchText}
              autoFocus
              style={{ flexShrink: 1 }}
              onChangeText={(searchText) => this.setState({ searchText })}
            />
            <Appbar.Action icon='close' onPress={onDismiss} />
          </Appbar.Header>
          <FlatList
            data={[]}
            renderItem={({ item }) => null}
            ListEmptyComponent={this.renderEmptyComponent}
            contentContainerStyle={{ flex: 1 }}
          />
        </Scene>
      </Modal>
    )
  }
}
