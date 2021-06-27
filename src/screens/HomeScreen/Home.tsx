import React from 'react'
import {View, Text, Button} from 'react-native'
import FastImage from 'react-native-fast-image'
import {HomeTabNavProps} from './HomeStackParamList'

const Home: React.FC<HomeTabNavProps<'Home'>> = ({navigation}) => {
  return (
    <View>
      <Text>GeoLocker</Text>
      <FastImage
        style={{width: 200, height: 200, backgroundColor: '#ddd'}}
        source={{
          uri: 'https://www.pngkit.com/png/detail/763-7631236_globe-earth-vector-png.png',
          priority: FastImage.priority.normal,
        }}
      />
      <Button
        title="Find Caches"
        onPress={() => navigation.navigate('CacheStack')}
      />
      <Button
        title="Sunrise/Sunset Times"
        onPress={() => navigation.navigate('SunScreen')}
      />
    </View>
  )
}

export default Home
