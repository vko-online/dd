import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  Headline,
  Title,
  Text,
  FAB,
  Appbar,
  Avatar,
  Card,
  Surface,
  Button,
  Subheading
} from 'react-native-paper'
import Pane, { Scene, Hpane } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import { primary, secondary } from 'src/theme'

const radius = 10

const colors = [
  '#3A86FF',
  '#E07A5F',
  '#C3BEF7',
  '#444444',
  '#E2EB98',
  '#F18701',
  '#81B29A'
]

interface Props {
  navigation: NavigationScreenProp<any, any>
}
class Screen extends PureComponent<Props> {
  static navigationOptions = {
    header: ({ scene, navigation }) => (
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={navigation.openDrawer} />
        <Appbar.Content title='Dashboard' subtitle='Welcome back, Medet' />
        <View />
        <Avatar.Image
          style={{ marginRight: 10 }}
          source={require('src/assets/images/avatar.jpeg')}
          size={40}
        />
      </Appbar.Header>
    )
  }

  renderItem = ({ item }) => (
    <Surface style={s.surface}>
      <View style={s.cover}>
        <Image
          source={{ uri: 'https://picsum.photos/700', cache: 'force-cache' }}
          style={{ width: 120, height: 120 }}
        />
      </View>
      <Pane justifyContent='center' alignItems='center' paddingVertical={10}>
        <Subheading>{item}</Subheading>
      </Pane>
    </Surface>
  )
  render () {
    return (
      <Scene backgroundColor='#F3F2F9'>
        <View style={s.content}>
          <Subheading style={[s.subheading, { color: colors[0] }]}>LOW CARB</Subheading>
          <FlatList
            data={['Breakfast', 'Lunch', 'Dinner']}
            renderItem={this.renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `key-${index}`}
            style={s.list}
            contentContainerStyle={{ height: 186 }}
          />
        </View>
        <View style={s.content}>
          <Subheading style={[s.subheading, { color: colors[1] }]}>KETO</Subheading>
          <FlatList
            data={['Breakfast', 'Lunch', 'Dinner']}
            renderItem={this.renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `key-${index}`}
            style={s.list}
            contentContainerStyle={{ height: 186 }}
          />
        </View>
      </Scene>
    )
  }
}

const s = StyleSheet.create({
  subheading: {
    fontSize: 14,
    fontFamily: 'diet-doctor-sans-medium',
    marginHorizontal: 10
  },
  surface: {
    margin: 10,
    elevation: 9,
    borderRadius: radius
  },
  cover: {
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    overflow: 'hidden'
  },
  action: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  actionText: {
    fontSize: 16,
    fontFamily: 'diet-doctor-sans-regular',
    color: '#3e8fe8'
  },
  content: {
    marginTop: 30,
    height: 250
  },
  list: {
    height: 150,
    paddingHorizontal: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff'
  }
})

export default Screen
