import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { CONSUMER_KEY as CK } from '@env'
import axios from 'axios'
import { useCallback } from 'react'

// import { LocationContext, LocationType } from '@context/LocationContext'
import { CacheStackScreenNavProps } from '../CacheStackScreenParamList'
import CacheList from './CacheList'
import RadiusSlider from 'components/RadiusSlider'
import Button from 'components/buttons/Button'
import { LocationContext, LocationType } from 'context/LocationContext'

// using a local consumer_key for now since @env fails to load key sometimes
const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'

export interface CacheListElementType {
  code: string
  name: string
}

// will also need access to lat|long (pass through context?)
const CacheSearch: React.FC<CacheStackScreenNavProps<'CacheSearch'>> = ({
  navigation,
}) => {
  const [radiusValue, setRadiusValue] = useState(3)
  const [caches, setCaches] = useState([] as CacheListElementType[])
  const [executeSearch, setExecuteSearch] = useState(false)

  const { latitude, longitude } = useContext<null | undefined | LocationType>(
    LocationContext,
  )?.coords!

  const handleRadiusChange = useCallback((newSliderValue: number) => {
    setRadiusValue(+newSliderValue.toFixed(2))
  }, [])

  useEffect(() => {
    if (executeSearch && latitude && longitude) {
      axios
        .get(
          'https://opencaching.pl/okapi/services/caches/shortcuts/search_and_retrieve',
          {
            params: {
              search_method: 'services/caches/search/nearest',
              search_params: {
                center: '51.1079|17.0385',
                // center: `${latitude}|${longitude}`,
                radius: radiusValue,
              },
              retr_method: 'services/caches/geocaches',
              retr_params: { fields: 'name' },
              wrap: false,
              consumer_key: CONSUMER_KEY,
            },
            timeout: 10000,
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
  }, [executeSearch, radiusValue, latitude, longitude])

  return (
    <View style={styles.container}>
      {caches?.length > 0 ? (
        <CacheList caches={caches} navigation={navigation} />
      ) : (
        <View>
          <Text>Set Search Radius:</Text>
          <RadiusSlider
            radiusValue={radiusValue}
            handleRadiusChange={handleRadiusChange}
          />
          <Text>Current Value: {radiusValue} km</Text>
          <Button title="Search" onPress={() => setExecuteSearch(true)} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#eee',
  },
})

export default CacheSearch
