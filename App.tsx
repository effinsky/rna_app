import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { API_KEY, T } from '@env'

import { CacheSearch } from './components/CacheSearch'
import Location from './components/Location'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <ScrollView style={styles.sectionContainer}>
      <Location />
      <CacheSearch />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
