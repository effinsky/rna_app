import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import { LocationContextProvider } from './src/context/LocationContext'
import HomeScreen from './src/screens/HomeScreen'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <LocationContextProvider>
        <SafeAreaView style={styles.container}>
          {/* to check if Hermes is active (have switched it on) */}
          {/* <Text>{`is Hermes?: ${!!global.HermesInternal}`}</Text> */}
          <HomeScreen />
        </SafeAreaView>
      </LocationContextProvider>
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
