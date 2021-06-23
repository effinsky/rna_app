import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'

const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'
const CACHE_CODE = 'OP0022'

type DetailsResponseType = {
  name: string
  code: string
  location: string
  status: string
  type: string
}

interface CacheDetailsProps {}

const CacheDetails: React.FC<CacheDetailsProps> = () => {
  const [details, setDetails] = useState<DetailsResponseType | null>(null)
  const [isLoading, setIsLoading] = useState()

  useEffect(() => {
    axios(
      `https://opencaching.pl/okapi/services/caches/geocache?cache_code=${CACHE_CODE}&consumer_key=${CONSUMER_KEY}`,
    )
      .then(response => setDetails(response.data))
      .catch(err => console.error(err))
  }, [details])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (details) {
    const { name, code, type, location, status } = details
    return (
      <View>
        <Text style={styles.heading}>{name}</Text>
        <Text>Type: {type}</Text>
        <Text> Code: {code}</Text>
        <Text>Location: {location}</Text>
        <Text>Status: {status}</Text>
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