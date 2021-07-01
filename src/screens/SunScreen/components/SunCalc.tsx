import React, { useState, useEffect, useCallback } from 'react'
import { Text, View } from 'react-native'
import SC from 'suncalc'
import range from 'lodash/range'

import SunDisplay from './SunDisplay'

export interface SunTimes {
  sunrise: string
  sunset: string
}

const SunCalc: React.FC<{}> = ({}) => {
  // const {
  //   coords: {latitude, longitude},
  // } = useContext<LocationType | null>(LocationContext)!

  const latitude = 51.1079
  const longitude = 17.0385
  const [times, setTimes] = useState<SunTimes[]>([])

  const getFutureDate = (daysOffset: number): Date => {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    return d
  }

  const getHoursAndMinutes = useCallback((date: Date): string => {
    const hours = formatDigits(date.getHours())
    const minutes = formatDigits(date.getMinutes())
    return `${hours}:${minutes}`
  }, [])

  const formatDigits = (digits: number) => {
    const digitsAsStr = digits.toString()
    return digitsAsStr.length > 1 ? digitsAsStr : `0${digitsAsStr}`
  }

  useEffect(() => {
    const timesList = [] as SunTimes[]

    range(0, 10).map(e => {
      const { sunrise: sunriseDate, sunset: sunsetDate } = SC.getTimes(
        getFutureDate(e),
        latitude,
        longitude,
      )

      const suntimes = {
        sunrise: getHoursAndMinutes(sunriseDate),
        sunset: getHoursAndMinutes(sunsetDate),
      }
      timesList.push(suntimes)
    })

    setTimes(timesList)
  }, [getHoursAndMinutes])

  if (!(latitude && longitude)) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return <SunDisplay times={times} />
}

export default SunCalc