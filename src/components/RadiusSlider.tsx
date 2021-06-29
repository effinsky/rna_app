import Slider from '@react-native-community/slider'
import React from 'react'
import { StyleSheet } from 'react-native'

interface RadiusSliderProps {
  radiusValue: number
  handleRadiusChange: (n: number) => void
}

const RadiusSlider: React.FC<RadiusSliderProps> = ({
  radiusValue,
  handleRadiusChange,
}) => {
  return (
    <Slider
      style={styles.sliderDimensions}
      minimumValue={radiusValue}
      maximumValue={50}
      step={1}
      minimumTrackTintColor="crimson"
      maximumTrackTintColor="black"
      value={radiusValue}
      onValueChange={newSliderValue => handleRadiusChange(newSliderValue)}
    />
  )
}

const styles = StyleSheet.create({
  sliderDimensions: {
    width: 300,
    height: 80,
  },
})

export default RadiusSlider
