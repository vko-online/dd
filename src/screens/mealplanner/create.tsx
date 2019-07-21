import React, { PureComponent } from 'react'
import {
  FlatList,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import {
  Text,
  Appbar,
  TextInput,
  Checkbox,
  Surface,
  HelperText,
  Title,
  Card,
  Headline,
  BottomNavigation,
  Divider,
  Button
} from 'react-native-paper'
import { TabView, SceneMap, Route, TabBar } from 'react-native-tab-view'
import RBSheet from 'react-native-raw-bottom-sheet'
import { MaterialIcons } from '@expo/vector-icons'
import { Scene, Hpane, Vpane } from 'view-on-steroids'
import { primary } from 'src/theme'
import Meal from './meal'

interface Item {
  id: string
  text: string
}
interface RenderItem { item: string }
interface Props {
  createVisible: boolean
  onDismiss?: () => void
  data: Item[]
}
interface State {
  status: 'checked' | 'unchecked' | 'indeterminate'
  index: number
  routes: Route[]
}
export default class Screen extends PureComponent<Props, State> {
  static defaultProps: Props = {
    createVisible: false,
    data: []
  }
  state: State = {
    status: 'indeterminate',
    index: 0,
    routes: [{
      key: 'suggestion',
      title: 'Suggestion'
    }, {
      key: 'favorites',
      title: 'Favorites'
    }, {
      key: 'search',
      title: 'Search/Browse'
    }]
  }
  sheet: React.RefObject<RBSheet> = React.createRef()

  handleCheckbox = () => {
    const { status } = this.state
    if (['indeterminate', 'unchecked'].includes(status)) {
      this.setState({
        status: 'checked'
      })
    } else {
      this.setState({
        status: 'unchecked'
      })
    }
  }

  renderLabel = ({ route, focused, color }) => (
    <Hpane>
      <Text style={{ color: focused ? '#444' : '#666', margin: 8, fontFamily: 'diet-doctor-sans-medium' }}>
        {route.title}
      </Text>
    </Hpane>
  )
  handleIndexChange = index => this.setState({ index })
  renderScene = BottomNavigation.SceneMap({
    suggestion: () => <View><Meal /></View>,
    favorites: () => <View><Meal /></View>,
    search: () => <View><Meal /></View>
  })

  handleExpand = () => {
    if (this.sheet.current) {
      this.sheet.current.open()
    }
  }

  renderWeekday = ({ item }: RenderItem) => {
    return(
      <Vpane marginBottom={20}>
        <Headline>{item}</Headline>
        <Hpane justifyContent='center' alignItems='center'>
          <Card style={s.card} onPress={this.handleExpand}>
            <Card.Title title='Add breakfast' titleStyle={s.cardTitle}/>
          </Card>
          <Card style={s.card}>
            <Card.Title title='Add lunch' titleStyle={s.cardTitle} />
          </Card>
          <Card style={s.card}>
            <Card.Title title='Add dinner' titleStyle={s.cardTitle} />
          </Card>
        </Hpane>
      </Vpane>
    )
  }

  componentWillUnmount () {
    if (this.sheet.current) {
      this.sheet.current.close()
    }
  }

  render () {
    const { createVisible, onDismiss } = this.props
    const { status } = this.state
    return (
      <Modal animated animationType='slide' visible={createVisible} onDismiss={onDismiss}>
        <Scene backgroundColor='#fff'>
          <Appbar.Header>
            <View />
            <Appbar.Content title='Create new meal plan' />
            <Appbar.Action icon='close' onPress={onDismiss} />
          </Appbar.Header>
          <Surface style={{ padding: 10, elevation: 4 }}>
            <TextInput
              label='Name'
              mode='outlined'
              placeholder='Name your meal plan'
              style={s.input}
            />
            <TextInput
              label='Description'
              mode='outlined'
              placeholder='Describe your meal plan'
              style={s.input}
            />
            <TouchableOpacity style={s.checkboxContainer} onPress={this.handleCheckbox} activeOpacity={0.8}>
              <Hpane alignItems='center'>
                <Checkbox
                  status={status}
                  style={s.checkbox}
                  color={primary}
                />
                <Text style={s.checkboxText}>Allow other members who have the link to view this meal plan?</Text>
              </Hpane>
            </TouchableOpacity>
            <HelperText>The meal plan will not be listed, but this allows you to manually share the link with other members.</HelperText>
          </Surface>
          <RBSheet
            ref={this.sheet}
            height={560}
            duration={250}
            closeOnDragDown={false}
            customStyles={{
              container: {
                position: 'relative'
              }
            }}
          >
            {/* <Meal /> */}
            <TabView
              navigationState={this.state}
              onIndexChange={this.handleIndexChange}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  renderLabel={this.renderLabel}
                  style={{ backgroundColor: '#fff' }}
                  indicatorStyle={{ backgroundColor: primary }}
                />
              )}
              renderScene={this.renderScene}
            />
          </RBSheet>
          <FlatList
            data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
            renderItem={this.renderWeekday}
            keyExtractor={(item, index) => `create-${index}`}
            showsVerticalScrollIndicator={false}
            style={{ padding: 20, paddingBottom: 50 }}
          />
        </Scene>
      </Modal>
    )
  }
}

const s = StyleSheet.create({
  input: {
    marginTop: 10
  },
  checkboxContainer: {
    marginTop: 10
  },
  checkbox: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333'
  },
  checkboxText: {
    marginRight: 30
  },
  card: {
    flex: 0.33,
    marginRight: 5,
    elevation: 2
  },
  cardTitle: {
    fontSize: 12,
    fontFamily: 'diet-doctor-sans-regular',
    textAlign: 'center',
    marginLeft: -20
  },
  divider: {
    marginVertical: 5
  }
})
