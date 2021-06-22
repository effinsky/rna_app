import React, { useEffect, useState } from "react"
import { StyleSheet, Text, Platform, ScrollView as View } from "react-native"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"

export interface LocationResponseType {
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

const Location = () => {
  const [locationResponse, setLocationResponse] =
    useState<null | LocationResponseType>(null)

  const permission =
    Platform.OS === "android"
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
      }
    })

    function enableLocation() {
      Geolocation.getCurrentPosition(
        // making TS happy
        position => {
          setLocationResponse(position as Required<LocationResponseType>)
        },
        err => console.error(err.code, err.message),
        {
          enableHighAccuracy: true,
          accuracy: { android: "high" },
          distanceFilter: 0,
          showLocationDialog: true,
        },
      )
    }
    // no cleanup necessary withGetCurrentPosition
  }, [permission])
  console.log(locationResponse)

  return (
    <View>
      <Text>{locationResponse?.coords.latitude}</Text>
      <Text>{locationResponse?.coords.longitude}</Text>
    </View>
  )
}

export default Location
