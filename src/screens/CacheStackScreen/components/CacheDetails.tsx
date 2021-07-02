import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

// import { CONSUMER_KEY } from '@env'
// import { LocationContext, LocationType } from '@context/LocationContext'
import { getDistance } from 'helpers/distance'
import { CacheStackScreenNavProps } from '../CacheStackScreenParamList'
import Button from 'components/buttons/Button'
import { capitalize } from 'lodash'

const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'

type DetailsResponseType = {
  name: string
  code: string
  location: string
  status: string
  type: string
}

const CacheDetails: React.FC<CacheStackScreenNavProps<'CacheDetails'>> = ({
  route,
  navigation,
}) => {
  const [details, setDetails] = useState<DetailsResponseType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [distance, setDistance] = useState<number | null>(null)
  // const contextValue = useContext<LocationType | null | undefined>(
  //   LocationContext,
  // )

  // // if context value is truthy, it must contain the coords obj in it
  // const { latitude, longitude } = contextValue?.coords!

  // hardcoding user lat long for now
  const latitude = 51.1079
  const longitude = 17.0385

  useEffect(() => {
    axios('https://opencaching.pl/okapi/services/caches/geocache', {
      params: {
        cache_code: route.params.cacheCode,
        consumer_key: CONSUMER_KEY,
      },
    })
      .then(response => {
        const { data } = response
        setDetails(data)
        // if possible, get crow flight distance between user and cache
        if (latitude && longitude) {
          const { location } = data as DetailsResponseType
          const [cacheLatitide, cacheLongitude] = location.split('|')
          // getting crow flight distance between user and cache
          const d = getDistance(
            latitude,
            longitude,
            +cacheLatitide,
            +cacheLongitude,
          ).toFixed(2)
          setDistance(+d)
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [details, route, latitude, longitude])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (details) {
    const { name, code, type, status } = details
    return (
      <View>
        {/* capitalize name for item */}
        <Text style={styles.heading}>{capitalize(name)}</Text>
        <Text style={styles.text}>Type: {type}</Text>
        <Text>Code: {code}</Text>
        {distance && <Text>Distance from User: {distance} km</Text>}
        <Text>Status: {status}</Text>
        <Button
          title="Back to Caches"
          onPress={() => {
            navigation.navigate('CacheSearch')
          }}
          extraStyles={{ alignSelf: 'center' }}
        />
      </View>
    )
  }

  return <Text>No data returned for given cache code</Text>
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
  },
  text: {
    fontSize: 15,
  },
})

export default CacheDetails
