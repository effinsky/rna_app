import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native'
// import { CONSUMER_KEY } from '@env'
import axios from 'axios'
import { useCallback } from 'react'

import RadiusSlider from './RadiusSlider'

// using a local consumer_key for now since @env fails to load key sometimes
const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'

interface CacheSearchProps {}

interface CacheListElementType {
  code: string
  name: string
}

// will also need access to lat|long (pass through context?)
export const CacheSearch: React.FC<CacheSearchProps> = () => {
  const [radiusValue, setRadiusValue] = useState(3)
  const [caches, setCaches] = useState([] as CacheListElementType[])
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
              search_params: { center: '54.3|22.3', radius: radiusValue },
              retr_method: 'services/caches/geocaches',
              retr_params: { fields: 'name' },
              wrap: false,
              consumer_key: 'wNcQ3up26jfZ4FBkb6Cc',
            },
          },
        )
        .then(response => {
          const cacheContainer = []
          for (const key in response.data) {
            const { name } = response.data[key]
            const cache = { code: key, name }
            cacheContainer.push(cache)
          }
          setCaches(cacheContainer)
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          console.log('request executed')
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
      {caches?.length > 0 ? (
        <FlatList
          data={caches}
          renderItem={({ item }) => (
            <View>
              <Pressable
                onPress={() => {
                  // navigate to cache details screen
                }}
              >
                <Text>{item.name}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={item => item.code}
        />
      ) : (
        <Text>Perform Search to Display Caches</Text>
      )}
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
