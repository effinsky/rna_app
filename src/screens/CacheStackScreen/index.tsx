import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { CacheStackScreenParamList } from './CacheStackScreenParamList'
import CacheSearch from '../../components/CacheSearch'
import CacheDetails from '../../components/CacheDetails'

const Stack = createStackNavigator()

const CacheStack: React.FC<CacheStackScreenParamList> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CacheSearch" component={CacheSearch} />
      <Stack.Screen name="CacheDetails" component={CacheDetails} />
    </Stack.Navigator>
  )
}

export default CacheStack
