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
      minimumValue={1}
      maximumValue={3}
      step={0.2}
      minimumTrackTintColor="crimson"
      maximumTrackTintColor="black"
      value={radiusValue}
      onValueChange={newSliderValue => handleRadiusChange(newSliderValue)}
    />
  )
}

export default RadiusSlider
