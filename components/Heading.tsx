import React, { FunctionComponent } from "react"
import { StyleSheet, Text, View } from "react-native"

export interface HeadingProps {
  text: string
}

const Heading: FunctionComponent<HeadingProps> = ({ text }) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontFamily: "Consolas",
  },
})

export default Heading
