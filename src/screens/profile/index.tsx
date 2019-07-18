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
          <Hpane alignItems='flex-end'>
            <Headline style={s.headline}>Today's meal</Headline>
            <TouchableOpacity style={s.action}>
              <Text style={s.actionText}>Edit</Text>
              <MaterialIcons name='navigate-next' color='#aaa' size={22} />
            </TouchableOpacity>
          </Hpane>
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
        <Hpane alignItems='flex-end'>
          <Headline style={s.headline}>Progress last week</Headline>
          <TouchableOpacity style={s.action}>
            <Text style={s.actionText}>Current</Text>
            <MaterialIcons name='navigate-next' color='#aaa' size={22} />
          </TouchableOpacity>
        </Hpane>
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
  headline: {
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
