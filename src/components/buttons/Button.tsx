import React from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  extraStyles?: { [key: string]: string | number }
}

const Button: React.FC<ButtonProps> = ({ title, onPress, extraStyles }) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.searchBtn, extraStyles, { backgroundColor: '#f87748' }]
          : [styles.searchBtn, extraStyles]
      }
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  searchBtn: {
    height: 40,
    width: 120,
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#8d8686',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ea9a7d',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Button
