import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'

export type CacheStackParamList = {
  CacheSearch: undefined
  CacheDetails: {cacheCode: string}
}

export type CacheStackNavProps<T extends keyof CacheStackParamList> = {
  navigation: StackNavigationProp<CacheStackParamList, T>
  route: RouteProp<CacheStackParamList, T>
}
