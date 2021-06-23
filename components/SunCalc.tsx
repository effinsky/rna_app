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
    // rework to loop over and get info for 10 days
    const sunriseDateToday = getSunrise(latitude, longitude)
    const sunsetDateToday = getSunset(latitude, longitude)

    const todayTimes = {
      sunrise: getHoursAndMinutes(sunriseDateToday),
      sunset: getHoursAndMinutes(sunsetDateToday),
    }

    const sunriseDate10Days = getSunrise(latitude, longitude, getFutureDate(10))
    const sunsetDate10Days = getSunset(latitude, longitude, getFutureDate(10))

    const plus10DaysTimes = {
      sunrise: getHoursAndMinutes(sunriseDate10Days),
      sunset: getHoursAndMinutes(sunsetDate10Days),
    }

    const t = []
    t.push(todayTimes)
    t.push(plus10DaysTimes)

    setTimes(t)
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
