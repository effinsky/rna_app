import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {StyleSheet, SafeAreaView} from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import CacheStack from './src/screens/CacheStack'
import {LocationContextProvider} from './src/context/LocationContext'

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <LocationContextProvider>
        <SafeAreaView style={styles.container}>
          <CacheStack />
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
