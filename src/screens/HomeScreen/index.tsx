import React from 'react'
import { HomeTabNavProps, HomeTabParamList } from './HomeTabParamList'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CacheStackScreen from '../CacheStackScreen'
import SunScreen from '../SunScreen'
import { View, Text, Button } from 'react-native'

const HomeTab = createBottomTabNavigator<HomeTabParamList>()

const Home: React.FC<HomeTabNavProps<'Home'>> = ({ navigation }) => {
  return (
    <View>
      <Text>Some Image Here</Text>
      <Button
        title="Find Caches"
        onPress={() => navigation.navigate('CacheStackScreen')}
      />
      <Button
        title="Sunrise/Sunset Times"
        onPress={() => navigation.navigate('SunScreen')}
      />
    </View>
  )
}

const HomeScreen: React.FC<{}> = ({}) => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen name="Home" component={Home} />
      <HomeTab.Screen name="CacheStack" component={CacheStackScreen} />
      <HomeTab.Screen name="SunScreen" component={SunScreen} />
    </HomeTab.Navigator>
  )
}

export default HomeScreen
