import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import CacheDetails from './src/components/CacheDetails'
import { CacheStack } from './src/screens/CacheStack'
import CacheSearch from './src/components/CacheSearch'
import { AppContextProvider } from './src/context/LocationContext'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <AppContextProvider>
        <View style={styles.container}>
          {/* <CacheSearch /> */}
          {/* <Location /> */}
          {/* <CacheDetails /> */}
          <CacheStack />
        </View>
      </AppContextProvider>
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
