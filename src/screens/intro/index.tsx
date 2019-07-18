import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Headline, Title, Subheading, Button, Divider } from 'react-native-paper'
import { Hpane, Vpane } from 'view-on-steroids'
import { LinearGradient } from 'expo-linear-gradient'
import { NavigationScreenProp } from 'react-navigation'
import { connect } from 'react-redux'

import { introCompleted } from 'src/actions/intro'

function lighten (color, percent) {
  let num = parseInt(color,16)
  let amt = Math.round(2.55 * percent)
  let R = (num >> 16) + amt
  let B = (num >> 8 & 0x00FF) + amt
  let G = (num & 0x0000FF) + amt
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1)}`
}

const slides = [
  {
    key: 'begin',
    title: 'Begin your keto journey',
    text: `At Diet Doctor, the world’s largest low-carb site, we’ll make your journey simple.
      Our trusted guides are written or reviewed by medical doctors, and based on science. Welcome!`,
    icon: 'explore',
    caption: 'Guide',
    color: 'rgba(255,255,255,0.7)',
    image: 'https://i.dietdoctor.com/wp-content/uploads/2018/02/groceryshopping_16-9.jpg?auto=compress%2Cformat&w=2000&h=1111&fit=crop',
    colors: [lighten('#686e5d', 60), '#686e5d']
  },
  {
    key: 'keep',
    title: 'Keep updated',
    text: 'We share the latest keto news, studies and success stories from around the world. ',
    icon: 'art-track',
    caption: 'News',
    color: 'rgba(255,255,255,0.7)',
    colors: [lighten('#6e86ae', 70), '#6e86ae']
  },
  {
    key: 'eat',
    title: 'What to eat?',
    text: 'Our amazing recipes can make your keto lifestyle simple and delicious. We are adding several new recipes every week.',
    icon: 'shopping-cart',
    caption: 'Recipes',
    color: 'rgba(255,255,255,0.7)',
    colors: [lighten('#73715e', 70), '#73715e']
  },
  {
    key: 'mealplan',
    title: 'We’ve already planned your breakfast, lunch and dinner…',
    text: 'Get lots of weekly keto and low-carb meal plans, complete with shopping lists, with our premium meal planner tool.',
    icon: 'date-range',
    caption: 'Meal plans',
    color: '#76c69a',
    colors: [lighten('#631010', 30), '#631010']
  },
  {
    key: 'inspiration',
    title: 'Hungry for insights and inspiration?',
    text: 'Diet Doctor’s video team travels around the world to provide you with fascinating interviews, practical guides and cooking videos… plus movies',
    icon: 'play-circle-filled',
    color: '#e73568',
    caption: 'Low-carb video',
    colors: [lighten('#2a2a2a', 20), '#2a2a2a']
  }
]

interface Props {
  onComplete: () => void
  navigation: NavigationScreenProp<any, any>
}
interface State {}

class Screen extends Component<Props, State> {
  renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[
        s.content,
        {
          flex: 1,
          paddingTop: item.topSpacer,
          paddingBottom: item.bottomSpacer,
          width: dimensions.width
        }
      ]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Vpane alignItems='center'>
        <Hpane alignItems='center' justifyContent='flex-start'>
          <MaterialIcons
            name={item.icon}
            size={30}
            color={item.color}
          />
          <Title style={{ color: item.color, marginLeft: 10 }}>{item.caption}</Title>
        </Hpane>
        <Headline style={s.title}>{item.title}</Headline>
        <Subheading style={s.text}>{item.text}</Subheading>
      </Vpane>
    </LinearGradient>
  )

  onSkip = () => {
    const { navigation } = this.props
    navigation.navigate('Home')
  }
  onDone = () => {
    const { navigation, onComplete } = this.props
    onComplete()
    navigation.goBack()
  }

  renderDoneButton = () => <Button color='#fff' mode='text'>Done</Button>
  renderNextButton = () => <Button color='#fff' mode='text'>Next</Button>
  renderPrevButton = () => <Button color='#fff' mode='text'>Prev</Button>
  renderSkipButton = () => <Button color='#fff' mode='text'>Skip</Button>

  render () {
    const { onComplete } = this.props
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this.renderItem}
        // bottomButton
        showPrevButton
        showSkipButton
        // hideNextButton
        renderDoneButton={this.renderDoneButton}
        renderPrevButton={this.renderPrevButton}
        renderSkipButton={this.renderSkipButton}
        renderNextButton={this.renderNextButton}
        onSkip={this.onSkip}
        onDone={this.onDone}
      />
    )
  }
}

const actions = dispatch => ({
  onComplete: () => dispatch(introCompleted())
})

const s = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10
  },
  image: {
    width: 400,
    height: 400
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  title: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  blur: {
    width: 400,
    height: 400
  }
})

export default connect(null, actions)(Screen)
