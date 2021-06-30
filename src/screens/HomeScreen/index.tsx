import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { HomeStackParamList } from './HomeStackParamList'
import CacheStackScreen from '../CacheStackScreen'
import SunScreen from '../SunScreen'
import Home from './Home'

const HomeStack = createStackNavigator<HomeStackParamList>()

const HomeScreen: React.FC<{}> = ({}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        // that was tricky. headerTitleStyle: {alignSelf: 'center'} does not work
        // anymore. What will Nav v6 bring us
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#ffa584' },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'GeoLocker',
        }}
      />
      <HomeStack.Screen
        name="CacheStackScreen"
        component={CacheStackScreen}
        options={{ headerTitle: 'Cache Search' }}
      />
      <HomeStack.Screen
        name="SunScreen"
        component={SunScreen}
        options={{ headerTitle: 'Sun Tables' }}
      />
    </HomeStack.Navigator>
  )
}

export default HomeScreen
