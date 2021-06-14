import React from "react"
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native"

import Heading from "./components/Heading"

const App = () => {
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Heading text="McMapper" />
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
