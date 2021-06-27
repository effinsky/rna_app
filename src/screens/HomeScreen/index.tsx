import React from 'react'
import {HomeStackParamList} from './HomeStackParamList'
import {createStackNavigator} from '@react-navigation/stack'

import CacheStack from '../CacheStack'
import SunScreen from '../SunScreen'
import Home from './Home'

const HomeTab = createStackNavigator<HomeStackParamList>()

const HomeScreen: React.FC<{}> = ({}) => {
  return (
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeTab.Screen name="Home" component={Home} />
      <HomeTab.Screen name="CacheStack" component={CacheStack} />
      <HomeTab.Screen name="SunScreen" component={SunScreen} />
    </HomeTab.Navigator>
  )
}

export default HomeScreen
