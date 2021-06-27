import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type HomeStackParamList = {
  Home: undefined
  CacheStack: undefined
  SunScreen: undefined
}

export type HomeTabNavProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>
  route: RouteProp<HomeStackParamList, T>
}
