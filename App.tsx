import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import { CacheSearch } from './components/CacheSearch'
import Location from './components/Location'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <View style={styles.container}>
      {/* <Location /> */}
      <CacheSearch />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
})

export default App
