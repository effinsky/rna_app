import React, { useState, FunctionComponent, useEffect } from "react"
import { Text, View } from "react-native"
import { getSunrise, getSunset } from "sunrise-sunset-js"

import SunDisplay from "./SunDisplay"

interface SunCalcProps {
  latitude: number
  longitude: number
}

export interface SunTimes {
  sunrise: string
  sunset: string
}

export const SunCalc: FunctionComponent<SunCalcProps> = ({
  latitude,
  longitude,
}) => {
  const [times, setTimes] = useState<SunTimes[]>([])

  useEffect(() => {
    const timesContainer = [] as SunTimes[]

    for (let i = 0; i < 10; i++) {
      const sunriseDate = getSunrise(latitude, longitude, getFutureDate(i))
      const sunsetDate = getSunset(latitude, longitude, getFutureDate(i))
      const times = {
        sunrise: getHoursAndMinutes(sunriseDate),
        sunset: getHoursAndMinutes(sunsetDate),
      }
      timesContainer.push(times)
    }

    // alternatively but seems less clear
    // const timesContainer = new Array<SunTimes | null>(10)
    //   .fill(null)
    //   .map((_, i) => {
    //     const sunriseDate = getSunrise(latitude, longitude, getFutureDate(i))
    //     const sunsetDate = getSunset(latitude, longitude, getFutureDate(i))
    //     const times = {
    //       sunrise: getHoursAndMinutes(sunriseDate),
    //       sunset: getHoursAndMinutes(sunsetDate),
    //     }
    //     return times
    //   })

    setTimes(timesContainer)
  }, [])

  const getFutureDate = (daysOffset: number): Date => {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    return d
  }

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
