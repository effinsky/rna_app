import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CacheStackScreenParamList } from './CacheStackScreenParamList'
import CacheSearch from '../../components/CacheSearch'
import CacheDetails from '../../components/CacheDetails'
import CacheList from '../../components/CacheList'

const Stack = createStackNavigator()

const CacheStack: React.FC<CacheStackScreenParamList> = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CacheSearch" component={CacheSearch} />
      <Stack.Screen name="CacheList" component={CacheList} />
      <Stack.Screen name="CacheDetails" component={CacheDetails} />
    </Stack.Navigator>
  )
}

export default CacheStack
