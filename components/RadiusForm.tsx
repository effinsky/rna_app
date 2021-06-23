import React from 'react'
import Slider from '@react-native-community/slider'
import { View, Text } from 'react-native'
interface RadiusFormProps {}

export const RadiusForm: React.FC<RadiusFormProps> = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Set Radius</Text>
      <Slider
        style={{ width: 300, height: 80 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="crimson"
        maximumTrackTintColor="#333"
      />
    </View>
  )
}
