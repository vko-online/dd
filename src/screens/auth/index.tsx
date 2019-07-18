import React, { PureComponent } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from 'react-native'
import {
  Title,
  TextInput,
  Button,
  Caption,
  Divider
} from 'react-native-paper'
import { Scene, Vpane, Footer } from 'view-on-steroids'
import { NavigationScreenProp } from 'react-navigation'
import { primary, secondary } from 'src/theme'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {}
class Screen extends PureComponent<Props, State> {
  onLogin = () => this.props.navigation.navigate('Home')
  render () {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <Scene paddingHorizontal={20} paddingTop={50} paddingBottom={20}>
          <Vpane alignItems='center' paddingVertical={20}>
            <Image source={require('../../assets/icon.png')} style={s.logo} />
            <Title>Diet Doctor</Title>
          </Vpane>
          <Text style={s.headline}>Low carb and keto made simple</Text>
          <Footer>
            <View style={{ backgroundColor: '#fff' }}>
              <TextInput
                theme={{ roundness: 35 }}
                style={s.input}
                mode='outlined'
                label='Your email'
              />
              <TextInput
                theme={{ roundness: 35 }}
                style={s.input}
                mode='outlined'
                label='Password'
              />
              <Button
                theme={{ roundness: 35 }}
                style={s.action}
                contentStyle={s.action_content}
                mode='contained'
                color='#06b05b'
                onPress={this.onLogin}
              >
                Log in
              </Button>
              <Button mode='text' uppercase={false}>
                Forgot your password?
              </Button>
              <Divider style={s.divider} />
              <Caption style={[s.caption, s.caption__bold]}>
                Not yet a member? Try 1 month for free.
              </Caption>
              <Caption style={s.caption}>
                Get access to hundreds of low-carb videos, meal plans and
                practical guides.
              </Caption>
              <Button
                theme={{ roundness: 35 }}
                style={s.action}
                contentStyle={s.action_content}
                dark
                mode='contained'
                color='#f086a4'
                onPress={this.onLogin}
              >
                Start free trial
              </Button>
            </View>
          </Footer>
        </Scene>
      </KeyboardAvoidingView>
    )
  }
}

const s = StyleSheet.create({
  input: {
    marginVertical: 5,
    backgroundColor: '#fff'
  },
  logo: {
    width: 100,
    height: 100
  },
  action: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '75%',
    height: 50,
    justifyContent: 'center'
  },
  action_content: {
    height: 50
  },
  headline: {
    fontWeight: '900',
    fontFamily: 'diet-doctor-sans-bold',
    fontSize: 30,
    color: secondary,
    textAlign: 'center'
  },
  caption: {
    fontFamily: 'diet-doctor-sans-regular',
    color: primary
  },
  caption__bold: {
    fontFamily: 'diet-doctor-sans-medium'
  },
  divider: {
    marginVertical: 10
  }
})

export default Screen
