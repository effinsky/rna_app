import React, {useState, useEffect, useContext} from 'react'
import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native'
// import {CONSUMER_KEY} from '@env'
import axios from 'axios'
import {useCallback} from 'react'

import RadiusSlider from './RadiusSlider'
import {LocationContext, LocationType} from '../context/LocationContext'
import {CacheStackNavProps} from '../screens/CacheStack/CacheStackParamList'

// using a local consumer_key for now since @env fails to load key sometimes
const CONSUMER_KEY = 'wNcQ3up26jfZ4FBkb6Cc'

interface CacheListElementType {
  code: string
  name: string
}

// will also need access to lat|long (pass through context?)
const CacheSearch: React.FC<CacheStackNavProps<'CacheSearch'>> = ({
  navigation,
}) => {
  const [radiusValue, setRadiusValue] = useState(3)

  // const {
  //   coords: {latitude, longitude},
  // } = useContext<null | LocationType>(LocationContext)
  const [caches, setCaches] = useState([] as CacheListElementType[])
  const [executeSearch, setExecuteSearch] = useState(false)

  const handleRadiusChange = useCallback((newSliderValue: number) => {
    setRadiusValue(+newSliderValue.toFixed(2))
  }, [])

  useEffect(() => {
    if (executeSearch) {
      axios
        .get(
          'https://opencaching.pl/okapi/services/caches/shortcuts/search_and_retrieve',
          {
            params: {
              search_method: 'services/caches/search/nearest',
              search_params: {
                center: '51.1079|17.0385',
                radius: radiusValue,
              },
              retr_method: 'services/caches/geocaches',
              retr_params: {fields: 'name'},
              wrap: false,
              consumer_key: CONSUMER_KEY,
            },
          },
        )
        .then(response => {
          const cacheContainer = []
          for (const key in response.data) {
            const {name} = response.data[key]
            const cache = {code: key, name}
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
  }, [executeSearch, radiusValue])

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
          renderItem={({item}) => (
            <View>
              <Pressable
                onPress={() => {
                  navigation.navigate('CacheDetails', {
                    cacheCode: item.code,
                  })
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
    backgroundColor: '#eee',
  },
  searchBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#8d8686',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'skyblue',
  },
})

export default CacheSearch
