import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {Text} from 'react-native'
import {CacheStackNavProps} from '../screens/CacheStack/CacheStackParamList'

const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'

type DetailsResponseType = {
  name: string
  code: string
  location: string
  status: string
  type: string
}

const CacheDetails: React.FC<CacheStackNavProps<'CacheDetails'>> = ({
  route,
  navigation,
}) => {
  const [details, setDetails] = useState<DetailsResponseType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    axios('https://opencaching.pl/okapi/services/caches/geocache', {
      params: {
        cache_code: route.params.cacheCode,
        consumer_key: CONSUMER_KEY,
      },
    })
      .then(response => {
        setDetails(response.data)
      })
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [details, route])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (details) {
    const {name, code, type, location, status} = details
    return (
      <View>
        <Text style={styles.heading}>{name}</Text>
        <Text>Type: {type}</Text>
        <Text> Code: {code}</Text>
        <Text>Location: {location}</Text>
        <Text>Status: {status}</Text>
        <Button
          title="Back to Caches"
          onPress={() => {
            navigation.navigate('CacheSearch')
          }}
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
    fontSize: 20,
  },
})

export default CacheDetails
