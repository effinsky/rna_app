import React, { useEffect, useState } from "react"
import { StyleSheet, Text, Platform, ScrollView as View } from "react-native"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import Geolocation from "react-native-geolocation-service"

import { SunCalc } from "./SunCalc"

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
        // making TSC happy
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

  return (
    <View>
      {locationResponse ? (
        <SunCalc
          longitude={locationResponse.coords.latitude}
          latitude={locationResponse.coords.longitude}
        />
      ) : (
        <Text>No Location Data Provided</Text>
      )}
      {/* <SunCalc longitude={2.17403} latitude={41.40338} /> */}
    </View>
  )
}

export default Location
