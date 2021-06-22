import React, { useState, FunctionComponent, useEffect } from "react"
import { Text, View } from "react-native"
import { getSunrise, getSunset } from "sunrise-sunset-js"
import SunDisplay from "./SunDisplay"

interface SunCalcProps {
  latitude: number
  longitude: number
}

export const SunCalc: FunctionComponent<SunCalcProps> = ({
  latitude,
  longitude,
}) => {
  const [times, setTimes] = useState<{ sunset: string; sunrise: string }>({
    sunrise: "",
    sunset: "",
  })

  useEffect(() => {
    const sunriseDate = getSunrise(latitude, longitude)
    const sunsetDate = getSunset(latitude, longitude)

    setTimes({
      sunrise: getHoursAndMinutes(sunriseDate),
      sunset: getHoursAndMinutes(sunsetDate),
    })
  }, [times.sunrise, times.sunset])

  const getHoursAndMinutes = (date: Date): string => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours}:${minutes}`
  }

  return (
    <View>
      <SunDisplay times={times} />
    </View>
  )
}
