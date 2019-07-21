import React, { Component } from 'react'
import { YellowBox, StatusBar } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
// import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { apolloReducer } from 'apollo-cache-redux'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ReduxLink from 'apollo-link-redux'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { persistStore, persistCombineReducers } from 'redux-persist'
import ReduxStorage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import { setContext } from 'apollo-link-context'
import { Provider as PaperProvider, DefaultTheme, Theme } from 'react-native-paper'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { createApolloFetch } from 'apollo-fetch'
import createSagaMiddleware from 'redux-saga'

YellowBox.ignoreWarnings(['Require cycle'])

import AppNavigator, { navReducer, navMiddleware } from 'src/navigation'
import auth from 'src/reducers/auth'
import intro from 'src/reducers/intro'
import { logout } from 'src/actions/auth'
import sagas from 'src/sagas'
import { primary, theme } from 'src/theme'

const REMOTE_HOST = 'ddapi.staging.dietdoctor.com/v1'
export const URL = `https://${REMOTE_HOST}` // set your comp's url here

const config = {
  key: 'root',
  version: 3,
  storage: ReduxStorage,
  blacklist: ['nav', 'apollo', 'intro', 'auth'] // don't persist nav for now
}

const reducer = persistCombineReducers<any>(config, {
  apollo: apolloReducer,
  auth,
  intro,
  nav: navReducer
})

const sagaMiddleware = createSagaMiddleware()
export const store: any = createStore(
  reducer,
  {}, // initial state
  applyMiddleware(thunk, navMiddleware, sagaMiddleware)
)
sagaMiddleware.run(sagas)

export const fetch = createApolloFetch({
  uri: URL
})

fetch.use((req: any, next) => {
  if (!req.options.headers) {
    req.options.headers = {}
  }
  // get the authentication token from local storage if it exists
  const jwt = store.getState().auth.jwt
  if (jwt) {
    req.options.headers.authorization = `Bearer ${jwt}`
  }
  next()
})

// persistent storage
const persistor = persistStore(store)

const cache = new InMemoryCache()

const reduxLink = new ReduxLink(store)

const uploadLink = createUploadLink({ uri: URL })

// middleware for requests
const middlewareLink = setContext((req, previousContext) => {
  // get the authentication token from local storage if it exists
  const { jwt } = store.getState().auth
  if (jwt) {
    return {
      headers: {
        authorization: `Bearer ${jwt}`
      }
    }
  }

  return previousContext
})

// afterware for responses
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  let shouldLogout = false
  if (graphQLErrors) {
    console.log({ graphQLErrors })
    graphQLErrors.forEach(({ message, locations, path }: any) => {
      console.log({ message, locations, path })
      if (message === 'Unauthorized') {
        shouldLogout = true
      }
    })

    console.log('shouldLogout', shouldLogout)
    if (shouldLogout) {
      store.dispatch(logout())
      setTimeout(client.resetStore)
    }
  }
  if (networkError) {
    console.log('[Network error]:')
    console.log({ networkError })
    if (networkError.statusCode === 401) {
      logout()
    }
  }
})

const link = ApolloLink.from([
  reduxLink,
  errorLink,
  middlewareLink.concat(uploadLink)
])

export const client = new ApolloClient({
  link,
  cache
})

interface Props {}
interface State {
  isReady: boolean
}
export default class App extends Component<Props, State> {
  state: State = {
    isReady: false
  }

  loadResourceAsync = () => {
    return Font.loadAsync({
      'diet-doctor-sans-regular': require('./src/assets/fonts/diet_doctor_sans-regular.ttf'),
      'diet-doctor-sans-medium': require('./src/assets/fonts/diet_doctor_sans-medium.ttf'),
      'diet-doctor-sans-bold': require('./src/assets/fonts/diet_doctor_sans-bold.ttf'),
      'diet-doctor-sans-italic': require('./src/assets/fonts/diet_doctor_sans-italic2.ttf')
    })
  }
  finishResourceLoad = () => {
    this.setState({ isReady: true })
  }

  render () {
    const { isReady } = this.state

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.loadResourceAsync}
          onFinish={this.finishResourceLoad}
        />
      )
    }
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <PaperProvider theme={theme}>
              <StatusBar animated backgroundColor={primary} barStyle='light-content' />
              <AppNavigator />
            </PaperProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    )
  }
}
