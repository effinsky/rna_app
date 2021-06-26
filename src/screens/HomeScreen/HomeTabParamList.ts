import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type HomeTabParamList = {
  Home: undefined
  CacheStack: undefined
  SunScreen: undefined
}

export type HomeTabNavProps<T extends keyof HomeTabParamList> = {
  navigation: StackNavigationProp<HomeTabParamList, T>
  route: RouteProp<HomeTabParamList, T>
}
