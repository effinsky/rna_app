import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'
import { CONSUMER_KEY } from '@env'
import axios from 'axios'
import { useCallback } from 'react'

import RadiusSlider from './RadiusSlider'

interface CacheSearchProps {}

// will also need access to lat|long (pass through context?)
export const CacheSearch: React.FC<CacheSearchProps> = () => {
  const [radiusValue, setRadiusValue] = useState(1)
  const [caches, setCaches] = useState({})
  const [executeSearch, setExecuteSearch] = useState(false)

  const handleRadiusChange = useCallback(
    (newSliderValue: number) => {
      setRadiusValue(+newSliderValue.toFixed(2))
    },
    [radiusValue],
  )

  useEffect(() => {
    if (executeSearch) {
      axios
        .get(
          'https://opencaching.pl/okapi/services/caches/shortcuts/search_and_retrieve',
          {
            params: {
              search_method: 'services/caches/search/nearest',
              search_params: { center: '49|19', radius: radiusValue },
              retr_method: 'services/caches/geocaches',
              retr_params: { fields: 'name|location|type' },
              wrap: false,
              consumer_key: 'wNcQ3up26jfZ4FBkb6Cc',
            },
          },
        )
        .then(response => {
          setCaches(response.data)
          console.log(response.status)
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          console.log('request done')
          setExecuteSearch(false)
        })
    }
  }, [executeSearch])

  return (
    <View style={styles.container}>
      <Text>Set Cache Search Radius:</Text>
      <RadiusSlider
        radiusValue={radiusValue}
        handleRadiusChange={handleRadiusChange}
      />

      <Text>Current Value: {radiusValue} km</Text>
      <Pressable
        style={styles.searchBtn}
        onPress={() => setExecuteSearch(true)}
      >
        <Text>Search Caches</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  searchBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'skyblue',
  },
})
