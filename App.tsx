import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import { CacheSearch } from './src/components/CacheSearch'
import Location from './src/components/Location'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Location />
        {/* <CacheSearch /> */}
      </View>
    </NavigationContainer>
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
