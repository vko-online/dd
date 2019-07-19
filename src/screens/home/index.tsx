import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
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
import { get, noop } from 'lodash'
import { data, Item } from 'src/data'

import Modal from './search'

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

interface RenderItem { item: Item, index: number }
interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  searchVisible: boolean
  searchText?: string
}
class Screen extends PureComponent<Props, State> {
  static navigationOptions = {
    header: ({ scene, navigation }) => {
      const action = get(scene, 'route.params.openSearch', noop)
      return (
        <Appbar.Header>
          <Appbar.Action icon='menu' onPress={navigation.openDrawer} />
          <Appbar.Content title='Diet Doctor' subtitle='Welcome back, Medet' />
          <View />
          <Appbar.Action icon='search' onPress={action} />
          <Appbar.Action icon='add' />
          {/* <Avatar.Image
            style={{ marginRight: 10 }}
            source={require('src/assets/images/avatar.jpeg')}
            size={40}
          /> */}
        </Appbar.Header>
      )
    }
  }
  state: State = {
    searchVisible: false
  }

  componentDidMount () {
    this.props.navigation.setParams({
      openSearch: this.openSearch
    })
  }

  openSearch = () => this.setState({ searchVisible: true })
  closeSearch = () => this.setState({ searchVisible: false })

  renderItem = ({ item, index }: RenderItem) => (
    <Card style={s.card}>
      <Card.Cover source={{ uri: item.image }} style={s.image} />
      <Card.Content>
        <Card.Title
          title={item.title}
          titleStyle={{ fontSize: 15, marginLeft: -17 }}
          style={{ height: 35 }}
        />
        <Paragraph numberOfLines={2}>
          {item.type && (
              <Text style={[s.type, { backgroundColor: typeColors[item.type] }]}>
                {` ${item.type.toUpperCase()} `}
              </Text>
          )}
          {' ' + item.description}
        </Paragraph>
      </Card.Content>
    </Card>
  )

  render () {
    const { searchVisible, searchText } = this.state
    return (
      <Scene backgroundColor='#F3F2F9'>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            data.map((item, index) => (
              <View style={s.content} key={index}>
                <Subheading style={[s.subheading, { color: colors[index] }]}>{item.title.toUpperCase()}</Subheading>
                <FlatList
                  data={item.data}
                  keyExtractor={(item, index) => `key-${index}`}
                  renderItem={this.renderItem}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={s.list}
                />
              </View>
            ))
          }
        </ScrollView>
        <Modal
          onDismiss={this.closeSearch}
          searchVisible={searchVisible}
          searchText={searchText}
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
