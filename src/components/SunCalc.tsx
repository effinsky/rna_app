import React, {useState, useEffect, useContext} from 'react'
// change out this lib
import {getSunrise, getSunset} from 'sunrise-sunset-js'

import {AppContext, LocationType} from '../context/LocationContext'
import SunDisplay from './SunDisplay'

export interface SunTimes {
  sunrise: string
  sunset: string
}

export const SunCalc: React.FC<{}> = () => {
  // get lat and long from location context
  const {
    coords: {latitude, longitude},
  } = useContext<LocationType | null>(AppContext)!
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

  return <SunDisplay times={times} />
}
