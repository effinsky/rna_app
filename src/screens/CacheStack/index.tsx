import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {CacheStackParamList} from './CacheStackParamList'
import CacheSearch from '../../components/CacheSearch'
import CacheDetails from '../../components/CacheDetails'

const Stack = createStackNavigator()

const CacheStack: React.FC<CacheStackParamList> = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CacheSearch" component={CacheSearch} />
      <Stack.Screen name="CacheDetails" component={CacheDetails} />
    </Stack.Navigator>
  )
}

export default CacheStack
