import React, { useState } from 'react'
import Slider from '@react-native-community/slider'
import { View, Text, Button } from 'react-native'
interface CacheSearchProps {}

export const CacheSearch: React.FC<CacheSearchProps> = () => {
  const [sliderValue, setSliderValue] = useState(0)

  const handleRadiusChange = (newSliderValue: number) => {
    setSliderValue(+newSliderValue.toFixed(2))
    console.log(sliderValue)
  }

  const handleSubmitRadius = () => {
    // navigate to Caches page to perform query with axios and display the cache list
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>Set Cache Search Radius:</Text>
      <Slider
        style={{ width: 300, height: 80 }}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        minimumTrackTintColor="crimson"
        maximumTrackTintColor="#333"
        value={sliderValue}
        onValueChange={newSliderValue => handleRadiusChange(newSliderValue)}
      />
      <Text>Current Value: {sliderValue}</Text>
      <Button title="search caches" onPress={handleSubmitRadius} />
    </View>
  )
}
