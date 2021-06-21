import React, { useEffect, useState } from "react"
import { StyleSheet, Text, Platform, ScrollView as View } from "react-native"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"

// types for GeolocationResponse
export type LocationType = {
  coords: CoordsType
  mocked: boolean
  provider: string
  timestamp: number
}

type CoordsType = {
  accuracy: number
  altitude: number
  altitudeAccuracy: number
  heading: number
  latitude: number
  longitude: number
  speed: number
}

const Location = () => {
  // type incoming object?
  const [locationResponse, setLocationResponse] =
    useState<null | LocationType>(null)

  const permission =
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

  useEffect(() => {
    let watchID: number

    check(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        watchID = enableLocation()
      } else if (result === RESULTS.DENIED) {
        request(permission).then(requestResult => {
          if (requestResult === RESULTS.GRANTED) {
            watchID = enableLocation()
          }
        })
      }
    })

    function enableLocation() {
      const watchID = Geolocation.watchPosition(
        // making TS happy
        position => {
          setLocationResponse(position as Required<LocationType>)
        },
        err => console.error(err.code, err.message),
        {
          enableHighAccuracy: true,
          accuracy: { android: "high" },
          distanceFilter: 0,
          interval: 1000,
          fastestInterval: 500,
          showsBackgroundLocationIndicator: true,
          showLocationDialog: true,
        },
      )
      return watchID
    }

    return () => {
      Geolocation.clearWatch(watchID)
    }
  }, [permission])

  return (
    <View>
      <Text>{locationResponse?.coords.latitude}</Text>
      <Text>{locationResponse?.coords.longitude}</Text>
    </View>
  )
}

export default Location
