import React, { createContext, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'

export interface LocationType {
  mocked: boolean
  provider: string
  timestamp: number
  coords: {
    accuracy: number
    altitude: number
    altitudeAccuracy: number
    heading: number
    latitude: number
    longitude: number
    speed: number
  }
}

const LocationContext = createContext<LocationType | null | undefined>(
  undefined,
)

const LocationContextProvider: React.FC<{}> = ({ children }) => {
  const [locationResponse, setLocationResponse] = useState<null | LocationType>(
    null,
  )

  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

  useEffect(() => {
    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        enableLocation()
      } else if (result === RESULTS.DENIED) {
        request(permission).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            enableLocation()
          }
        })
      } else {
        throw 'location inaccessible'
      }
    })

    const enableLocation = () => {
      Geolocation.getCurrentPosition(
        position => setLocationResponse(position as Required<LocationType>),
        error => {
          setLocationResponse(null)
          console.log(error)
        },
        {
          enableHighAccuracy: true,
          accuracy: { android: 'high' },
          distanceFilter: 0,
          showLocationDialog: true,
        },
      )
    }
    // cleanup necessary?
  }, [permission])

  return (
    <LocationContext.Provider value={locationResponse}>
      {children}
    </LocationContext.Provider>
  )
}

export { LocationContextProvider, LocationContext }
