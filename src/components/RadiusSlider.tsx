import Slider from '@react-native-community/slider'
import React from 'react'

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
      style={{ width: 300, height: 80 }}
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

export default RadiusSlider
