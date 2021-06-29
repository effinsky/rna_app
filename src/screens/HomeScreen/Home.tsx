import React from 'react'
import { View } from 'react-native'
import Button from '../../components/buttons/Button'
import { HomeStackNavProps } from './HomeStackParamList'

const Home: React.FC<HomeStackNavProps<'Home'>> = ({ navigation }) => {
  return (
    <View>
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

export default Home
