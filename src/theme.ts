import { DefaultTheme, Theme } from 'react-native-paper'

export const primary = '#404040'
export const secondary = '#0E3478'
export const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary,
    text: primary
  },
  fonts: {
    regular: 'diet-doctor-sans-regular',
    medium: 'diet-doctor-sans-medium',
    light: 'diet-doctor-sans-regular',
    thin: 'diet-doctor-sans-regular'
  }
}
