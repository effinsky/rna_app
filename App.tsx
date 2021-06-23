import React, { useEffect } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"
import SplashScreen from "react-native-splash-screen"
import { API_KEY, T } from "@env"

import Heading from "./components/Heading"
import Location from "./components/Location"

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <Heading text={`${API_KEY}`} />
      <Location />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default App
