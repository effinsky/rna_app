import { CacheListElementType } from './../../components/CacheSearch'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type CacheStackScreenParamList = {
  CacheSearch: undefined
  CacheList: { caches: CacheListElementType[] }
  CacheDetails: { cacheCode: string }
}

export type CacheStackScreenNavProps<
  T extends keyof CacheStackScreenParamList,
> = {
  navigation: StackNavigationProp<CacheStackScreenParamList, T>
  route: RouteProp<CacheStackScreenParamList, T>
}
