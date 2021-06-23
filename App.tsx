import React, { useEffect } from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"
import SplashScreen from "react-native-splash-screen"
import { API_KEY, T } from "@env"

import Heading from "./components/Heading"
import { RadiusForm } from "./components/RadiusForm"

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Heading text={`${API_KEY}`} />
        <RadiusForm />
      </ScrollView>
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
