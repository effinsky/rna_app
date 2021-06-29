import React, { useState, useEffect } from 'react'
import SunCalc from 'suncalc'

// import {LocationContext, LocationType} from '../../context/LocationContext'
import SunDisplay from '../../components/SunDisplay'

export interface SunTimes {
  sunrise: string
  sunset: string
}

const SunScreen: React.FC<{}> = () => {
  // const {
  //   coords: {latitude, longitude},
  // } = useContext<LocationType | null>(LocationContext)!

  const latitude = 51.1079
  const longitude = 17.0385
  const [times, setTimes] = useState<SunTimes[]>([])

  useEffect(() => {
    const timesList = [] as SunTimes[]

    for (let i = 0; i < 10; i++) {
      const { sunrise: sunriseDate, sunset: sunsetDate } = SunCalc.getTimes(
        getFutureDate(i),
        latitude,
        longitude,
      )

      const suntimes = {
        sunrise: getHoursAndMinutes(sunriseDate),
        sunset: getHoursAndMinutes(sunsetDate),
      }

      timesList.push(suntimes)
    }

    setTimes(timesList)
  }, [])
  // helpers
  const getFutureDate = (daysOffset: number): Date => {
    const d = new Date()
    d.setDate(d.getDate() + daysOffset)
    return d
  }

  const getHoursAndMinutes = (date: Date): string => {
    const hours = formatDigits(date.getHours())
    const minutes = formatDigits(date.getMinutes())
    return `${hours}:${minutes}`
  }

  const formatDigits = (digits: number) => {
    const digitsAsStr = digits.toString()
    return digitsAsStr.length > 1 ? digitsAsStr : `0${digitsAsStr}`
  }

  return <SunDisplay times={times} />
}

export default SunScreen
